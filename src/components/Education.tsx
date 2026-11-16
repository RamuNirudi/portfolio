import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { EDUCATION_DATA } from '../data/profile';

export default function Education() {
  return (
    <section
      id="education"
      className="relative border-t border-[#D0DCEB] bg-[#EEF4FC] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#0891B2]">
            ACADEMIC FOUNDATION
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0E1C36] sm:text-4xl">
            Education
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 rounded-2xl border border-[#D0DCEB] bg-white p-6 sm:p-8 shadow-[0_8px_28px_rgba(14,28,54,0.05)] transition-colors duration-200 hover:border-[#1463FF]/55"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4 sm:gap-5">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#C8D8EC] bg-[#EEF5FF] text-[#1463FF]"
              >
                <GraduationCap className="h-7 w-7" />
              </motion.div>

              <div>
                <p className="font-mono text-xs font-semibold text-[#0891B2]">
                  UNDERGRADUATE ENGINEERING DEGREE
                </p>
                <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#0E1C36]">
                  {EDUCATION_DATA.degree} – {EDUCATION_DATA.field}
                </h3>
                <p className="mt-1 text-base font-medium text-[#4A5F7E]">
                  {EDUCATION_DATA.institution}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#4A5F7E]">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#1463FF]" />
                    <span>{EDUCATION_DATA.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                    <Calendar className="h-3.5 w-3.5 text-[#1463FF]" />
                    <span>{EDUCATION_DATA.duration}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#C8D8EC] bg-[#F5F9FF] px-5 py-4 shrink-0">
              <Award className="h-6 w-6 text-[#0891B2]" />
              <div>
                <p className="font-mono text-[11px] font-medium text-[#4A5F7E]">ACADEMIC CGPA</p>
                <p className="font-display text-2xl font-bold text-[#0E1C36] tabular-nums">
                  {EDUCATION_DATA.cgpa}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
