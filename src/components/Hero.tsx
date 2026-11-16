import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, Download, Mail } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { downloadEngineerCvPdf } from '../utils/generateCvPdf';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import HeroCncScene from './HeroCncScene';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#F2F6FB] via-[#EDF4FC] to-[#E6EFFA] engineering-grid-bg pt-24 pb-14 lg:pt-28 lg:pb-16"
    >
      {/* Cool Arctic Cyan & Sapphire Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-[460px] w-[460px] rounded-full bg-[#38BDF8]/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-[#1463FF]/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Typographic Hierarchy */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="hero-stagger font-mono text-xs font-semibold tracking-[0.14em] text-[#0891B2]">
              NIRUDI RAMU · {PROFILE_DATA.title.toUpperCase()}
            </p>

            <h1 className="hero-stagger mt-4 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-[#0E1C36] sm:text-5xl xl:text-[56px] text-balance">
              ENGINEERING{' '}
              <span className="bg-gradient-to-r from-[#1463FF] via-[#0284C7] to-[#06B6D4] bg-clip-text text-transparent">
                PRECISION.
              </span>
              <br />
              BUILDING{' '}
              <span className="bg-gradient-to-r from-[#1463FF] via-[#0284C7] to-[#06B6D4] bg-clip-text text-transparent">
                PERFORMANCE.
              </span>
            </h1>

            <p className="hero-stagger mt-6 max-w-xl text-base leading-relaxed text-[#4A5F7E] sm:text-[17px]">
              {PROFILE_DATA.heroSummary}
            </p>

            {/* Verified Engineering Credentials */}
            <div className="hero-stagger mt-7 grid grid-cols-1 gap-y-2.5 gap-x-6 border-y border-[#CBD8EA] py-4 sm:grid-cols-2">
              {PROFILE_DATA.heroMetaPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2.5 text-sm font-medium text-[#0E1C36]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1463FF]" aria-hidden="true" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hero-stagger mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1463FF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(20,99,255,0.28)] transition-all duration-200 hover:bg-[#0D50D9] hover:shadow-[0_8px_24px_rgba(20,99,255,0.38)] whitespace-nowrap shrink-0"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={downloadEngineerCvPdf}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#C8D8EC] bg-white px-5 py-2.5 text-sm font-semibold text-[#0E1C36] shadow-sm transition-colors duration-200 hover:border-[#1463FF] hover:text-[#1463FF] whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4 text-[#0891B2]" />
                <span>Download Resume</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-transparent px-4 py-2.5 text-sm font-semibold text-[#4A5F7E] transition-colors duration-200 hover:bg-white/70 hover:text-[#0E1C36] whitespace-nowrap shrink-0"
              >
                <Mail className="h-4 w-4 text-[#1463FF]" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* Right 3D CNC Milling & Precision Part Interactive Viewport */}
          <div className="hero-stagger flex lg:col-span-6">
            <HeroCncScene />
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="mt-10 flex items-center justify-between border-t border-[#CBD8EA] pt-5">
          <span className="font-mono text-xs text-[#4A5F7E]">
            NIRUDI RAMU · B.TECH MECHANICAL ENGINEERING · HYDERABAD
          </span>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1463FF] transition-colors hover:text-[#0891B2]"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
