import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/experience';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotionPreference();
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'principle-acs': true,
    'saideepa-rock-drills': true,
  });

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.exp-timeline-card', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.16,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative border-t border-[#D0DCEB] bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#0891B2]">
            PROFESSIONAL EXPERIENCE
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0E1C36] sm:text-4xl text-balance">
            6+ Years of Production Floor &amp; Engineering Leadership
          </h2>
          <p className="mt-3 text-base text-[#4A5F7E]">
            Progressive manufacturing engineering track record across precision industrial machining and cross-functional production leadership.
          </p>
        </div>

        <div className="relative mt-12 space-y-8 pl-6 sm:pl-10">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-2 sm:left-3.5 w-[2px] bg-gradient-to-b from-[#06B6D4] via-[#1463FF]/50 to-[#D0DCEB]"
          />

          {EXPERIENCE_DATA.map((exp, idx) => {
            const isExpanded = Boolean(expandedIds[exp.id]);
            return (
              <div key={exp.id} className="exp-timeline-card relative">
                <div
                  aria-hidden="true"
                  className={`absolute -left-[22px] sm:-left-[32px] top-7 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                    idx === 0
                      ? 'border-[#06B6D4] bg-white'
                      : 'border-[#1463FF] bg-white'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      idx === 0 ? 'bg-[#06B6D4]' : 'bg-[#1463FF]'
                    }`}
                  />
                </div>

                <article className="rounded-2xl border border-[#D0DCEB] bg-[#F8FBFF] p-6 sm:p-8 shadow-[0_6px_24px_rgba(14,28,54,0.04)] transition-all duration-200 hover:border-[#1463FF]/55 hover:bg-white">
                  <div className="flex flex-col justify-between gap-4 border-b border-[#DCE6F3] pb-5 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#0891B2] font-mono font-semibold">
                        <span>{exp.periodTag}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 font-normal text-[#4A5F7E]">
                          <MapPin className="h-3.5 w-3.5 text-[#1463FF]" />
                          {exp.location}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-bold text-[#0E1C36]">
                        {exp.position}
                      </h3>
                      <p className="mt-1 inline-flex items-center gap-2 text-base font-semibold text-[#1463FF]">
                        <Building2 className="h-4 w-4" />
                        <span>{exp.company}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 font-mono text-sm font-medium text-[#0E1C36] tabular-nums">
                        <Calendar className="h-4 w-4 text-[#0891B2]" />
                        {exp.duration}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleExpand(exp.id)}
                        aria-expanded={isExpanded}
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#D0DCEB] bg-white px-3.5 py-2 text-xs font-semibold text-[#4A5F7E] transition-colors hover:border-[#1463FF] hover:text-[#1463FF] whitespace-nowrap shrink-0"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'View Responsibilities'}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#4A5F7E]">
                    {exp.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#4A5F7E]">
                    {exp.focusDomains.map((domain, dIdx) => (
                      <span key={domain} className="inline-flex items-center gap-3">
                        <span className="font-medium text-[#0E1C36]">{domain}</span>
                        {dIdx < exp.focusDomains.length - 1 && (
                          <span aria-hidden="true" className="text-[#1463FF]">
                            /
                          </span>
                        )}
                      </span>
                    ))}
                  </div>

                  {isExpanded && (
                    <div className="mt-6 grid grid-cols-1 gap-6 border-t border-[#DCE6F3] pt-6 lg:grid-cols-12">
                      <div className="lg:col-span-8">
                        <h4 className="font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
                          KEY ENGINEERING RESPONSIBILITIES
                        </h4>
                        <ul className="mt-3 space-y-2.5">
                          {exp.responsibilities.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-[#334A6B]"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1463FF]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="lg:col-span-4">
                        <h4 className="font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
                          CORE DELIVERABLES
                        </h4>
                        <ul className="mt-3 space-y-2.5">
                          {exp.deliverables.map((deliv) => (
                            <li
                              key={deliv}
                              className="rounded-lg border border-[#D0DCEB] bg-white px-3.5 py-2.5 text-xs font-medium leading-relaxed text-[#0E1C36]"
                            >
                              {deliv}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
