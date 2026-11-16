import { useState } from 'react';
import { motion } from 'motion/react';
import { UserCheck, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

export default function About() {
  const [imgError, setImgError] = useState(false);

  const milestones = [
    { period: '2023 – Present', title: 'Senior Manufacturing Engineer', org: 'Principle ACS' },
    { period: '2020 – 2023', title: 'Manufacturing Engineer', org: 'Saideepa Rock Drills' },
    { period: '2016 – 2019', title: 'B.Tech Mechanical Engineering', org: 'GRIET, Hyderabad' },
  ];

  return (
    <section
      id="about"
      className="relative border-t border-[#D0DCEB] bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
          {/* Left Portrait & Career Progression Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#D0DCEB] bg-[#EAF1FA] shadow-[0_12px_36px_rgba(14,28,54,0.08)]">
              {!imgError ? (
                <img
                  src={PROFILE_DATA.portraitImage}
                  alt="Nirudi Ramu (Ramu Nirudi) – Senior Manufacturing Engineer and CNC Specialist in Hyderabad"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={1200}
                  onError={() => setImgError(true)}
                  className="aspect-[3/4] w-full object-cover object-top"
                />
              ) : (
                <div className="flex aspect-[3/4] w-full flex-col items-center justify-center bg-gradient-to-br from-[#EAF1FA] to-[#DCE8F7] p-8 text-center">
                  <UserCheck className="h-12 w-12 text-[#1463FF]" />
                  <p className="mt-4 font-display text-lg font-semibold text-[#0E1C36]">
                    {PROFILE_DATA.fullName}
                  </p>
                  <p className="mt-1 text-sm text-[#4A5F7E]">{PROFILE_DATA.title}</p>
                </div>
              )}

              {/* Measured Bottom Gradient Scrim */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E1C36]/90 via-[#0E1C36]/55 to-transparent p-6">
                <p className="font-display text-lg font-bold text-white">
                  {PROFILE_DATA.fullName}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#E2ECF7]">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#38BDF8]" />
                    <span>{PROFILE_DATA.location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Compact Timeline Summary */}
            <div className="rounded-xl border border-[#D0DCEB] bg-[#F5F9FF] p-5">
              <p className="font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
                ENGINEERING PROGRESSION
              </p>
              <div className="mt-4 space-y-4">
                {milestones.map((item, idx) => (
                  <div
                    key={item.period}
                    className={`flex items-start justify-between gap-4 ${
                      idx !== milestones.length - 1 ? 'border-b border-[#D0DCEB] pb-3' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {idx < 2 ? (
                        <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-[#1463FF]" />
                      ) : (
                        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#0891B2]" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-[#0E1C36]">{item.title}</p>
                        <p className="text-xs text-[#4A5F7E]">{item.org}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#4A5F7E] whitespace-nowrap shrink-0 tabular-nums">
                      {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Engineering Narrative & Technical Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#0891B2]">
              ABOUT ME
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0E1C36] sm:text-4xl text-balance">
              {PROFILE_DATA.aboutHeading}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4A5F7E]">
              {PROFILE_DATA.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* 4 Key Technical Pillars */}
            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PROFILE_DATA.aboutPillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-[#D0DCEB] bg-[#F5F9FF] p-5 transition-all duration-200 hover:border-[#1463FF]/60 hover:bg-white hover:shadow-[0_8px_24px_rgba(20,99,255,0.08)]"
                >
                  <span className="font-mono text-xs font-semibold text-[#1463FF] tabular-nums">
                    0{index + 1}.
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold text-[#0E1C36]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4A5F7E]">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
