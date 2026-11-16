import { useState, type FormEvent } from 'react';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { downloadEngineerCvPdf } from '../utils/generateCvPdf';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setStatusMessage(null);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    const formSubmitEndpoint = `https://formsubmit.co/ajax/${PROFILE_DATA.formSubmitEmail}`;

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          _subject: `${payload.subject}`,
          _replyto: payload.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = (await response.json()) as {
        success?: boolean | string;
        message?: string;
      };

      const isSuccess = data.success === true || data.success === 'true';

      if (response.ok && isSuccess) {
        setStatusMessage({
          type: 'success',
          text: `Message sent successfully`,
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        return;
      }

      // FormSubmit activation or validation message
      if (data.message && /activat/i.test(data.message)) {
        setStatusMessage({
          type: 'info',
          text: `FormSubmit requires one-time activation: please check ${PROFILE_DATA.formSubmitEmail} (including spam) and click "Activate Form".`,
        });
        return;
      }

      setStatusMessage({
        type: 'error',
        text: data.message || `Could not deliver via FormSubmit. You can email ${PROFILE_DATA.formSubmitEmail} directly.`,
      });
    } catch {
      const mailSubject = encodeURIComponent(
        payload.subject || `Manufacturing Engineering Inquiry from ${payload.name}`
      );
      const mailBody = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
      );
      window.location.href = `mailto:${PROFILE_DATA.formSubmitEmail}?subject=${mailSubject}&body=${mailBody}`;
      setStatusMessage({
        type: 'info',
        text: `FormSubmit network request was blocked; opened your email client addressed to ${PROFILE_DATA.formSubmitEmail}.`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-[#D0DCEB] bg-[#EEF4FC] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Direct Contact Details & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#0891B2]">
                CONTACT
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0E1C36] sm:text-4xl text-balance">
                LET&apos;S BUILD SOMETHING PRECISE.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A5F7E]">
                Open to opportunities in Senior Manufacturing Engineering, CNC Engineering, Production Engineering and Process Optimization.
              </p>

              <dl className="mt-8 space-y-4 border-y border-[#CBD8EA] py-6 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1463FF]" />
                  <div>
                    <dt className="font-mono text-xs text-[#4A5F7E]">LOCATION</dt>
                    <dd className="mt-0.5 font-semibold text-[#0E1C36]">{PROFILE_DATA.location}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#1463FF]" />
                  <div>
                    <dt className="font-mono text-xs text-[#4A5F7E]">PHONE</dt>
                    <dd className="mt-0.5 font-mono font-semibold text-[#0E1C36] tabular-nums">
                      <a
                        href={`tel:${PROFILE_DATA.phone}`}
                        className="hover:text-[#1463FF] transition-colors"
                      >
                        {PROFILE_DATA.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#1463FF]" />
                  <div>
                    <dt className="font-mono text-xs text-[#4A5F7E]">EMAIL</dt>
                    <dd className="mt-0.5 font-semibold text-[#0E1C36] break-all">
                      <a
                        href={`mailto:${PROFILE_DATA.email}`}
                        className="hover:text-[#1463FF] transition-colors"
                      >
                        {PROFILE_DATA.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1463FF] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#0D50D9] whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Me</span>
                </a>

                <a
                  href={`tel:${PROFILE_DATA.phone}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#C8D8EC] bg-white px-4 py-2.5 text-xs font-semibold text-[#0E1C36] transition-colors hover:border-[#1463FF] hover:text-[#1463FF] whitespace-nowrap shrink-0"
                >
                  <Phone className="h-4 w-4 text-[#0891B2]" />
                  <span>Call {PROFILE_DATA.phone}</span>
                </a>

                <a
                  href={PROFILE_DATA.linkedinPlaceholderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#C8D8EC] bg-white px-4 py-2.5 text-xs font-semibold text-[#4A5F7E] transition-colors hover:border-[#1463FF] hover:text-[#1463FF] whitespace-nowrap shrink-0"
                >
                  <Linkedin className="h-4 w-4 text-[#1463FF]" />
                  <span>LinkedIn</span>
                </a>

                <button
                  type="button"
                  onClick={downloadEngineerCvPdf}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#1463FF]/40 bg-[#E2EEFF] px-4 py-2.5 text-xs font-semibold text-[#1463FF] transition-colors hover:bg-[#1463FF] hover:text-white whitespace-nowrap shrink-0"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Contact Inquiry Form with Server Email Service */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#D0DCEB] bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(14,28,54,0.06)] space-y-5"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-[#0E1C36]">
                  Send an Engineering Inquiry
                </h3>
                <p className="mt-1 text-xs text-[#4A5F7E]">
                  Inquiries are delivered via FormSubmit to {PROFILE_DATA.formSubmitEmail}.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold text-[#334A6B]">Your Name</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Engineering Manager / Recruiter"
                    className="mt-1.5 w-full rounded-lg border border-[#C8D8EC] bg-[#F8FBFF] px-3.5 py-2.5 text-sm text-[#0E1C36] placeholder:text-[#7A8FA8] focus:border-[#1463FF] focus:bg-white focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-[#334A6B]">Your Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="mt-1.5 w-full rounded-lg border border-[#C8D8EC] bg-[#F8FBFF] px-3.5 py-2.5 text-sm text-[#0E1C36] placeholder:text-[#7A8FA8] focus:border-[#1463FF] focus:bg-white focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-semibold text-[#334A6B]">Subject</span>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Senior Manufacturing Engineer Opportunity / CNC Consultation"
                  className="mt-1.5 w-full rounded-lg border border-[#C8D8EC] bg-[#F8FBFF] px-3.5 py-2.5 text-sm text-[#0E1C36] placeholder:text-[#7A8FA8] focus:border-[#1463FF] focus:bg-white focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-[#334A6B]">Message</span>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share role details, CNC/manufacturing scope, or interview scheduling availability..."
                  className="mt-1.5 w-full rounded-lg border border-[#C8D8EC] bg-[#F8FBFF] px-3.5 py-2.5 text-sm text-[#0E1C36] placeholder:text-[#7A8FA8] focus:border-[#1463FF] focus:bg-white focus:outline-none resize-y"
                />
              </label>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#1463FF] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(20,99,255,0.28)] transition-all duration-200 hover:bg-[#0D50D9] disabled:opacity-60 whitespace-nowrap shrink-0"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {statusMessage && (
                  <p
                    role="status"
                    className={`inline-flex items-start gap-2 text-xs font-medium leading-relaxed ${
                      statusMessage.type === 'error'
                        ? 'text-[#DC2626]'
                        : statusMessage.type === 'success'
                        ? 'text-[#059669]'
                        : 'text-[#0891B2]'
                    }`}
                  >
                    {statusMessage.type === 'error' ? (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    <span>{statusMessage.text}</span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
