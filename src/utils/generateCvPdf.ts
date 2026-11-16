function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function parseFilenameFromHeader(headerValue: string | null): string | null {
  if (!headerValue) return null;
  const match = headerValue.match(/filename\*?=(?:UTF-8'')?"?([^";\n]+)"?/i);
  return match && match[1] ? decodeURIComponent(match[1].trim()) : null;
}

/**
 * Downloads the latest CV PDF stored in the public/ folder via /api/cv
 * (automatically picking up any new .pdf pasted into public/) with static /cv.pdf fallback.
 */
export async function downloadEngineerCvPdf(): Promise<void> {
  const cacheBust = `t=${Date.now()}`;
  const candidates = [`/api/cv?${cacheBust}`, `/cv.pdf?${cacheBust}`];

  for (const endpoint of candidates) {
    try {
      const response = await fetch(endpoint, { cache: 'no-store' });
      if (!response.ok) continue;

      const contentType = response.headers.get('Content-Type') || '';
      if (!contentType.includes('pdf') && !endpoint.includes('.pdf')) continue;

      const blob = await response.blob();
      if (blob.size === 0) continue;

      const headerName = parseFilenameFromHeader(
        response.headers.get('Content-Disposition')
      );
      triggerBlobDownload(blob, headerName || 'Nirudi_Ramu_CV.pdf');
      return;
    } catch {
      // Try next candidate
    }
  }
}
