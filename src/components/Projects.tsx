import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Wrench } from 'lucide-react';
import { PROJECTS_DATA, type ProjectCaseStudy } from '../data/projects';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import CaseStudy from './CaseStudy';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotionPreference();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const [customMetrics, setCustomMetrics] = useState<Record<string, string>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.project-card-item', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
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

  const categories = ['All', ...PROJECTS_DATA.map((p) => p.category)];
  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const handleUpdateMetric = (metricKey: string, value: string) => {
    setCustomMetrics((prev) => ({ ...prev, [metricKey]: value }));
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative border-t border-[#D0DCEB] bg-[#EEF4FC] py-20 lg:py-28 engineering-grid-fine"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#0891B2]">
              ENGINEERING CASE STUDIES
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0E1C36] sm:text-4xl text-balance">
              Manufacturing Process, Tooling &amp; Quality Case Studies
            </h2>
            <p className="mt-3 text-base text-[#4A5F7E]">
              Structured technical case studies across CNC machining, fixture development, NPI validation, root-cause elimination, and Lean 5S deployment. Confidential production figures are maintained as editable placeholders.
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Filter engineering case studies"
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'border-[#1463FF] bg-[#1463FF] text-white shadow-sm'
                  : 'border-[#D0DCEB] bg-white text-[#4A5F7E] hover:border-[#1463FF]/55 hover:text-[#0E1C36]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => {
            const imgBroken = Boolean(failedImages[project.id]);
            const isFeatured = selectedCategory === 'All' && index === 0;

            return (
              <article
                key={project.id}
                onClick={() => setActiveProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveProject(project);
                  }
                }}
                className={`project-card-item group flex flex-col overflow-hidden rounded-2xl border border-[#D0DCEB] bg-white shadow-[0_6px_24px_rgba(14,28,54,0.05)] transition-all duration-200 hover:border-[#1463FF] hover:shadow-[0_14px_36px_rgba(20,99,255,0.12)] cursor-pointer ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative overflow-hidden bg-[#E5EEF9]">
                  {!imgBroken ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      width={isFeatured ? 1200 : 800}
                      height={isFeatured ? 675 : 600}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className={`w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
                        isFeatured ? 'aspect-[16/9] max-h-[340px]' : 'aspect-[4/3]'
                      }`}
                    />
                  ) : (
                    <div
                      className={`flex w-full flex-col items-center justify-center bg-gradient-to-br from-[#EEF4FC] to-[#DCE8F7] p-6 text-center ${
                        isFeatured ? 'aspect-[16/9] max-h-[340px]' : 'aspect-[4/3]'
                      }`}
                    >
                      <Wrench className="h-9 w-9 text-[#1463FF]" />
                      <p className="mt-3 font-display text-sm font-semibold text-[#0E1C36]">
                        {project.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="font-mono text-xs font-semibold text-[#0891B2]">
                      0{index + 1}. {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#0E1C36] group-hover:text-[#1463FF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#4A5F7E] line-clamp-3">
                      {project.overview}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#E2ECF7] pt-4">
                    <span className="font-mono text-xs text-[#4A5F7E] truncate pr-3">
                      {project.toolsAndTechniques.slice(0, 2).join(' · ')}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1463FF] whitespace-nowrap shrink-0">
                      <span>View Case Study</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <CaseStudy
        project={activeProject}
        customMetrics={customMetrics}
        onUpdateMetric={handleUpdateMetric}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
