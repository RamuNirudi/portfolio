import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

interface ScrollProgressProps {
  onScrollTop: () => void;
}

export default function ScrollProgress({ onScrollTop }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; active: boolean }>({
    x: -100,
    y: -100,
    active: false,
  });
  const [isFinePointer, setIsFinePointer] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
      setShowBackToTop(scrollTop > 480);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined' || !window.matchMedia) return;
    const fineMq = window.matchMedia('(pointer: fine)');
    setIsFinePointer(fineMq.matches);

    if (!fineMq.matches) return;

    let rafId = 0;
    let latestX = -100;
    let latestY = -100;
    let latestActive = false;

    const onMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      const target = e.target as HTMLElement | null;
      latestActive = Boolean(
        target?.closest('a, button, input, textarea, select, [role="button"]')
      );
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setCursorPos({ x: latestX, y: latestY, active: latestActive });
          rafId = 0;
        });
      }
    };

    const onLeave = () => {
      setCursorPos((prev) => ({ ...prev, x: -100, y: -100 }));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#1463FF] via-[#0284C7] to-[#06B6D4] transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subtle Desktop-Only Precision Crosshair Cursor */}
      {isFinePointer && !reducedMotion && cursorPos.x > -50 && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[60] hidden lg:block"
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
          }}
        >
          <div
            className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-transform duration-150 ${
              cursorPos.active
                ? 'h-8 w-8 border-[#1463FF]/80 bg-[#1463FF]/10 scale-110'
                : 'h-5 w-5 border-[#0891B2]/55 bg-transparent scale-100'
            }`}
          />
        </div>
      )}

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={onScrollTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-[#C8D8EC] bg-white/95 text-[#1463FF] shadow-[0_8px_24px_rgba(14,28,54,0.12)] transition-all duration-200 hover:border-[#1463FF] hover:bg-[#1463FF] hover:text-white"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </>
  );
}
