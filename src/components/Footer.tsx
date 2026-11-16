import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onScrollTop: () => void;
}

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer({ onNavigate, onScrollTop }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#D0DCEB] bg-white engineering-grid-bg py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-[#DCE6F3] pb-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3.5">
            <img
              src={PROFILE_DATA.logoImage}
              alt="Nirudi Ramu (Ramu Nirudi) logo"
              width={44}
              height={44}
              decoding="async"
              className="h-11 w-11 rounded-full object-cover object-center ring-2 ring-[#1463FF]/30 shadow-sm shrink-0"
            />
            <div>
              <p className="font-display text-lg font-bold tracking-wide text-[#0E1C36]">
                RAMU NIRUDI <span className="text-[#1463FF]">·</span> NIRUDI RAMU
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#4A5F7E]">
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#1463FF] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#1463FF]" />
                  <span>{PROFILE_DATA.email}</span>
                </a>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#0891B2]" />
                  <span>{PROFILE_DATA.location}</span>
                </span>
              </div>
            </div>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.id);
                }}
                className="text-xs font-semibold text-[#4A5F7E] transition-colors hover:text-[#1463FF] whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-[#4A5F7E]">
            © {year} {PROFILE_DATA.fullName}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={onScrollTop}
            className="inline-flex items-center gap-2 rounded-lg border border-[#D0DCEB] bg-[#F5F9FF] px-3.5 py-2 text-xs font-semibold text-[#0E1C36] transition-colors hover:border-[#1463FF] hover:text-[#1463FF]"
          >
            <ArrowUp className="h-3.5 w-3.5 text-[#1463FF]" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
