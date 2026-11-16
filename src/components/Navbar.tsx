import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { downloadEngineerCvPdf } from '../utils/generateCvPdf';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'highlights', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onNavigate }: NavbarProps) {
  const [activeId, setActiveId] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollY = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveId(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    setActiveId(id);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#D0DCEB] shadow-[0_4px_20px_rgba(14,28,54,0.06)]'
          : 'bg-[#F2F6FB]/75 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: User Photo Logo + Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#0E1C36] whitespace-nowrap shrink-0"
        >
          <img
            src={PROFILE_DATA.logoImage}
            alt="Nirudi Ramu (Ramu Nirudi) – Senior Manufacturing Engineer logo"
            width={36}
            height={36}
            decoding="async"
            className="h-9 w-9 rounded-full object-cover object-center ring-2 ring-[#1463FF]/35 shadow-sm"
          />
          <span className="font-display tracking-wide">{PROFILE_DATA.brandWordmark}</span>
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#1463FF] font-semibold' : 'text-[#4A5F7E] hover:text-[#0E1C36]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#1463FF] to-[#06B6D4]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={downloadEngineerCvPdf}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#1463FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(20,99,255,0.25)] transition-all duration-200 hover:bg-[#0D50D9] hover:shadow-[0_6px_20px_rgba(20,99,255,0.35)] whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download CV</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-[#D0DCEB] bg-white text-[#0E1C36] hover:border-[#1463FF]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-[#D0DCEB] bg-white/98 px-4 pb-5 pt-2 shadow-lg">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EEF5FF] text-[#1463FF] border border-[#1463FF]/30 font-semibold'
                      : 'text-[#4A5F7E] hover:bg-[#F2F6FB] hover:text-[#0E1C36]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#1463FF]" />}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                downloadEngineerCvPdf();
              }}
              className="mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#1463FF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0D50D9]"
            >
              <Download className="h-4 w-4" />
              <span>Download CV (PDF)</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
