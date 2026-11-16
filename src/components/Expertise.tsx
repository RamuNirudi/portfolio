import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  Factory,
  Wrench,
  ShieldCheck,
  TrendingUp,
  MonitorCog,
} from 'lucide-react';
import { SKILL_CATEGORIES, type SkillCategory } from '../data/skills';

const ICON_MAP = {
  cnc: Cpu,
  manufacturing: Factory,
  tooling: Wrench,
  quality: ShieldCheck,
  lean: TrendingUp,
  software: MonitorCog,
};

function CategoryCard({
  category,
  isSelected,
  onSelect,
}: {
  category: SkillCategory;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, hovered: false });
  const Icon = ICON_MAP[category.iconKey];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      hovered: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos((prev) => ({ ...prev, hovered: false }))}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-[#1463FF] bg-white shadow-[0_14px_36px_rgba(20,99,255,0.14)]'
          : 'border-[#D0DCEB] bg-white/95 shadow-[0_4px_20px_rgba(14,28,54,0.04)] hover:border-[#1463FF]/55 hover:shadow-[0_12px_30px_rgba(20,99,255,0.09)]'
      }`}
    >
      {/* Subtle Mouse-Following Cool Ice-Blue Spotlight */}
      {mousePos.hovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(20, 99, 255, 0.08), transparent 65%)`,
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C8D8EC] bg-[#EEF5FF] text-[#1463FF]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono text-xs font-semibold text-[#0891B2]">
                DOMAIN {category.code}
              </span>
              <h3 className="font-display text-lg font-bold text-[#0E1C36]">
                {category.title}
              </h3>
            </div>
          </div>
          <span className="font-mono text-xs text-[#4A5F7E] tabular-nums">
            {category.capabilities.length} Capabilities
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#4A5F7E]">
          {category.subtitle}
        </p>

        {/* Capability Rows with Non-Percentage Precision Depth Bands */}
        <div className="mt-5 space-y-3 border-t border-[#E2ECF7] pt-4">
          {category.capabilities.map((cap) => (
            <div key={cap.name} className="space-y-1">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-[#0E1C36]">{cap.name}</span>
                <div
                  className="flex items-center gap-1 shrink-0"
                  aria-label={`${cap.name} operational competency`}
                >
                  {[1, 2, 3, 4, 5].map((band) => (
                    <span
                      key={band}
                      className={`h-1.5 w-3.5 rounded-[2px] transition-colors duration-200 ${
                        band <= cap.depthBands
                          ? 'bg-gradient-to-r from-[#1463FF] to-[#06B6D4]'
                          : 'bg-[#DCE6F3]'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#4A5F7E]">{cap.application}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Expertise() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const visibleCategories =
    activeFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeFilter);

  return (
    <section
      id="expertise"
      className="relative border-t border-[#D0DCEB] bg-[#EEF4FC] py-20 lg:py-28 engineering-grid-fine"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#0891B2]">
              TECHNICAL EXPERTISE
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0E1C36] sm:text-4xl text-balance">
              Core Manufacturing &amp; CNC Engineering Capabilities
            </h2>
            <p className="mt-3 text-base text-[#4A5F7E]">
              Multidisciplinary command across CNC metal removal, production process routing, custom workholding, quality governance, and continuous improvement.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter engineering expertise domains"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#D0DCEB] bg-white p-1.5 shadow-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeFilter === 'all'
                  ? 'bg-[#1463FF] text-white'
                  : 'text-[#4A5F7E] hover:text-[#0E1C36]'
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeFilter === cat.id
                    ? 'bg-[#1463FF] text-white'
                    : 'text-[#4A5F7E] hover:text-[#0E1C36]'
                }`}
              >
                {cat.code}. {cat.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={activeFilter === category.id}
              onSelect={() =>
                setActiveFilter((prev) => (prev === category.id ? 'all' : category.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
