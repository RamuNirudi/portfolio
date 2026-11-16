import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || 'nirudiramu118@gmail.com';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  const defaultPublicUrl = 'https://ais-pre-t66hcfhmckgrzuiuzpbtfq-185815216297.asia-east1.run.app';
  const resolveSiteUrl = () => {
    const raw = (process.env.APP_URL || '').trim();
    if (raw && raw !== 'MY_APP_URL') {
      return raw.replace(/\/+$/, '');
    }
    return defaultPublicUrl;
  };

  app.get('/robots.txt', (_req: Request, res: Response) => {
    const siteUrl = resolveSiteUrl();
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  });

  app.get('/sitemap.xml', (_req: Request, res: Response) => {
    const siteUrl = resolveSiteUrl();
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>2026-11-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${siteUrl}/assets/aistudio/ram_pic_58da190a.jpeg</image:loc>
      <image:title>Nirudi Ramu (Ramu Nirudi) – Senior Manufacturing Engineer</image:title>
    </image:image>
  </url>
</urlset>
`);
  });

  app.get('/favicon.ico', (_req: Request, res: Response) => {
    const devIco = path.resolve(__dirname, 'public', 'favicon.ico');
    const prodIco = path.resolve(__dirname, 'dist', 'favicon.ico');
    const icoPath = fs.existsSync(devIco) ? devIco : prodIco;
    if (fs.existsSync(icoPath)) {
      res.type('image/x-icon');
      res.sendFile(icoPath);
      return;
    }
    res.status(404).end();
  });

  // Dynamic CV PDF endpoint: serves the newest .pdf file in public/ (or dist/ in production)
  app.get('/api/cv', (_req: Request, res: Response) => {
    try {
      const searchDirs = [
        path.resolve(__dirname, 'public'),
        path.resolve(__dirname, 'dist'),
      ];

      let latestPdf: { filePath: string; fileName: string; mtimeMs: number } | null = null;

      for (const dir of searchDirs) {
        if (!fs.existsSync(dir)) continue;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.pdf')) continue;
          const fullPath = path.join(dir, entry.name);
          const stat = fs.statSync(fullPath);
          if (!latestPdf || stat.mtimeMs > latestPdf.mtimeMs) {
            latestPdf = {
              filePath: fullPath,
              fileName: entry.name === 'cv.pdf' ? 'Nirudi_Ramu_CV.pdf' : entry.name,
              mtimeMs: stat.mtimeMs,
            };
          }
        }
        // Prefer public/ when it already contains a PDF
        if (latestPdf) break;
      }

      if (!latestPdf) {
        res.status(404).json({ ok: false, error: 'No CV PDF found in public folder.' });
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${latestPdf.fileName.replace(/"/g, '')}"`
      );
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(latestPdf.filePath);
    } catch (err) {
      console.error('CV download error:', err);
      res.status(500).json({ ok: false, error: 'Unable to load CV file.' });
    }
  });

  // Real Email Service Endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const body = req.body as {
        name?: string;
        email?: string;
        subject?: string;
        message?: string;
      };

      const name = (body.name || '').trim();
      const email = (body.email || '').trim();
      const subject = (body.subject || '').trim();
      const message = (body.message || '').trim();

      if (!name || !email || !subject || !message) {
        res.status(400).json({
          ok: false,
          error: 'Please fill in your name, email, subject, and message.',
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          ok: false,
          error: 'Please enter a valid email address.',
        });
        return;
      }

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d0dceb; border-radius: 10px; overflow: hidden;">
          <div style="background: #1463ff; color: #ffffff; padding: 18px 24px;">
            <h2 style="margin: 0; font-size: 18px;">New Portfolio Inquiry — Nirudi Ramu</h2>
          </div>
          <div style="padding: 24px; background: #f8fbff; color: #0e1c36;">
            <p style="margin: 0 0 12px;"><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
            <p style="margin: 0 0 12px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <div style="margin-top: 16px; padding: 16px; background: #ffffff; border: 1px solid #d0dceb; border-radius: 8px; white-space: pre-wrap; line-height: 1.6;">
              ${escapeHtml(message)}
            </div>
          </div>
        </div>
      `;

      const textContent = `New Portfolio Inquiry\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;

      // Path 1: SMTP via Nodemailer (e.g., Gmail App Password)
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      if (smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT || 465),
          secure: (process.env.SMTP_SECURE || 'true') === 'true',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${smtpUser}>`,
          to: RECEIVER_EMAIL,
          replyTo: email,
          subject: `[Portfolio Inquiry] ${subject}`,
          text: textContent,
          html: htmlContent,
        });

        res.json({
          ok: true,
          delivered: true,
          provider: 'smtp',
          message: `Your message has been sent directly to ${RECEIVER_EMAIL}.`,
        });
        return;
      }

      // Path 2: Resend API if configured
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [RECEIVER_EMAIL],
            reply_to: email,
            subject: `[Portfolio Inquiry] ${subject}`,
            text: textContent,
            html: htmlContent,
          }),
        });

        if (!resendResponse.ok) {
          const errText = await resendResponse.text();
          console.error('Resend API error:', errText);
          res.status(502).json({
            ok: false,
            error: 'Email service returned an error. Please try again or use direct email.',
          });
          return;
        }

        res.json({
          ok: true,
          delivered: true,
          provider: 'resend',
          message: `Your message has been sent directly to ${RECEIVER_EMAIL}.`,
        });
        return;
      }

      // Path 3: Server mail secrets not yet configured — inform client cleanly so it opens mailto fallback
      res.json({
        ok: true,
        delivered: false,
        fallback: 'mailto',
        message: 'Email client draft prepared.',
      });
    } catch (err) {
      console.error('Contact endpoint error:', err);
      res.status(500).json({
        ok: false,
        error: 'Failed to process contact request. Please use direct email.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('/{*splat}', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
