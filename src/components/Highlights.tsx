import { motion } from 'motion/react';
import { CAREER_HIGHLIGHTS } from '../data/profile';

export default function Highlights() {
  return (
    <section
      id="highlights"
      className="relative border-t border-[#D0DCEB] bg-white py-16 lg:py-24 engineering-grid-bg"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#0891B2]">
            CAREER HIGHLIGHTS
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0E1C36] sm:text-4xl">
            Verified Engineering Milestones
          </h2>
          <p className="mt-3 text-base text-[#4A5F7E]">
            Factual career benchmarks grounded strictly in verified employment and academic records.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAREER_HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[#D0DCEB] bg-[#F8FBFF] p-6 shadow-[0_6px_22px_rgba(14,28,54,0.04)] transition-all duration-200 hover:border-[#1463FF]/60 hover:bg-white"
            >
              <p className="font-display text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#1463FF] via-[#0284C7] to-[#06B6D4] bg-clip-text text-transparent tabular-nums">
                {item.value}
              </p>
              <h3 className="mt-3 font-display text-base font-bold text-[#0E1C36]">
                {item.label}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4A5F7E]">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
