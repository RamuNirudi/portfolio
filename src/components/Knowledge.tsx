import { useState } from 'react';
import { BookOpen, Calculator, ChevronRight, Layers } from 'lucide-react';
import { KNOWLEDGE_TOPICS, type KnowledgeTopic } from '../data/knowledge';

function TechnicalDiagram({ topic }: { topic: KnowledgeTopic }) {
  const [vc, setVc] = useState(180);
  const [diameter, setDiameter] = useState(16);
  const [flutes, setFlutes] = useState(4);
  const [fz, setFz] = useState(0.08);

  const rpm = diameter > 0 ? Math.round((1000 * vc) / (Math.PI * diameter)) : 0;
  const feedRate = Math.round(rpm * flutes * fz);

  if (topic.diagramType === 'speeds') {
    return (
      <div className="rounded-xl border border-[#D0DCEB] bg-[#F5F9FF] p-5">
        <div className="flex items-center justify-between gap-2 border-b border-[#DCE6F3] pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-[#1463FF]" />
            <span className="font-mono text-xs font-semibold text-[#0E1C36]">
              CNC CUTTING PARAMETER CALCULATOR
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#4A5F7E]">METRIC (ISO)</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <label className="block">
            <span className="font-mono text-[11px] text-[#4A5F7E]">Vc (m/min)</span>
            <input
              type="number"
              min={10}
              max={1000}
              value={vc}
              onChange={(e) => setVc(Math.max(1, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-lg border border-[#C8D8EC] bg-white px-3 py-2 font-mono text-sm text-[#0E1C36] focus:border-[#1463FF] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[11px] text-[#4A5F7E]">Tool Ø D (mm)</span>
            <input
              type="number"
              min={1}
              max={300}
              value={diameter}
              onChange={(e) => setDiameter(Math.max(1, Number(e.target.value) || 1))}
              className="mt-1 w-full rounded-lg border border-[#C8D8EC] bg-white px-3 py-2 font-mono text-sm text-[#0E1C36] focus:border-[#1463FF] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[11px] text-[#4A5F7E]">Flutes (z)</span>
            <input
              type="number"
              min={1}
              max={12}
              value={flutes}
              onChange={(e) => setFlutes(Math.max(1, Number(e.target.value) || 1))}
              className="mt-1 w-full rounded-lg border border-[#C8D8EC] bg-white px-3 py-2 font-mono text-sm text-[#0E1C36] focus:border-[#1463FF] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[11px] text-[#4A5F7E]">fz (mm/tooth)</span>
            <input
              type="number"
              step={0.01}
              min={0.01}
              max={1}
              value={fz}
              onChange={(e) => setFz(Math.max(0.01, Number(e.target.value) || 0.01))}
              className="mt-1 w-full rounded-lg border border-[#C8D8EC] bg-white px-3 py-2 font-mono text-sm text-[#0E1C36] focus:border-[#1463FF] focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#DCE6F3] pt-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#D0DCEB] bg-white px-4 py-3">
            <span className="font-mono text-[11px] text-[#4A5F7E]">SPINDLE SPEED (n)</span>
            <p className="mt-1 font-mono text-xl font-bold text-[#0891B2] tabular-nums">
              {rpm.toLocaleString()} RPM
            </p>
          </div>
          <div className="rounded-lg border border-[#D0DCEB] bg-white px-4 py-3">
            <span className="font-mono text-[11px] text-[#4A5F7E]">TABLE FEED RATE (Vf)</span>
            <p className="mt-1 font-mono text-xl font-bold text-[#1463FF] tabular-nums">
              {feedRate.toLocaleString()} mm/min
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#D0DCEB] bg-[#F5F9FF] p-5">
      <p className="font-mono text-[11px] font-semibold tracking-wider text-[#0891B2]">
        ENGINEERING SCHEMATIC REFERENCE
      </p>

      {topic.diagramType === 'gcode' && (
        <svg viewBox="0 0 420 150" className="mt-3 w-full" aria-label="CNC Toolpath G-Code Schematic">
          <rect x="0" y="0" width="420" height="150" rx="8" fill="#0F2547" />
          <path d="M 40 120 L 40 30 L 380 30" stroke="#2E5288" strokeWidth="1" fill="none" />
          <polyline
            points="65,110 120,110 120,55 215,55 260,85 340,85"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2.5"
          />
          <line x1="65" y1="35" x2="65" y2="110" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="65" cy="110" r="4" fill="#38BDF8" />
          <circle cx="120" cy="55" r="4" fill="#60A5FA" />
          <circle cx="340" cy="85" r="4" fill="#38BDF8" />
          <text x="72" y="45" fill="#38BDF8" fontSize="10" fontFamily="monospace">G00 Z+5.0 (Rapid)</text>
          <text x="128" y="48" fill="#FFFFFF" fontSize="10" fontFamily="monospace">G01 Linear Feed</text>
          <text x="242" y="104" fill="#CBD5E1" fontSize="10" fontFamily="monospace">G54 Work Datum</text>
        </svg>
      )}

      {topic.diagramType === 'workholding' && (
        <svg viewBox="0 0 420 150" className="mt-3 w-full" aria-label="3-2-1 Workholding Schematic">
          <rect x="0" y="0" width="420" height="150" rx="8" fill="#0F2547" />
          <rect x="95" y="42" width="230" height="72" rx="4" fill="#173461" stroke="#60A5FA" strokeWidth="1.8" />
          <circle cx="145" cy="78" r="16" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="275" cy="78" r="16" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="115" y="114" width="24" height="12" fill="#60A5FA" />
          <rect x="198" y="114" width="24" height="12" fill="#60A5FA" />
          <rect x="281" y="114" width="24" height="12" fill="#60A5FA" />
          <rect x="79" y="64" width="16" height="28" fill="#38BDF8" fillOpacity="0.85" />
          <text x="132" y="31" fill="#38BDF8" fontSize="10" fontFamily="monospace">3-2-1 DATUM LOCATING PINS &amp; CLAMP FORCE</text>
          <text x="115" y="140" fill="#CBD5E1" fontSize="9.5" fontFamily="monospace">Primary Datum A (3 Pads)</text>
        </svg>
      )}

      {topic.diagramType === 'gdt' && (
        <svg viewBox="0 0 420 150" className="mt-3 w-full" aria-label="GD&T Feature Control Frame">
          <rect x="0" y="0" width="420" height="150" rx="8" fill="#0F2547" />
          <rect x="45" y="45" width="330" height="54" fill="#173461" stroke="#60A5FA" strokeWidth="1.6" />
          <line x1="105" y1="45" x2="105" y2="99" stroke="#60A5FA" strokeWidth="1.2" />
          <line x1="215" y1="45" x2="215" y2="99" stroke="#60A5FA" strokeWidth="1.2" />
          <line x1="270" y1="45" x2="270" y2="99" stroke="#60A5FA" strokeWidth="1.2" />
          <line x1="322" y1="45" x2="322" y2="99" stroke="#60A5FA" strokeWidth="1.2" />
          <circle cx="75" cy="72" r="13" fill="none" stroke="#38BDF8" strokeWidth="1.6" />
          <line x1="56" y1="72" x2="94" y2="72" stroke="#38BDF8" strokeWidth="1.2" />
          <line x1="75" y1="53" x2="75" y2="91" stroke="#38BDF8" strokeWidth="1.2" />
          <text x="122" y="77" fill="#FFFFFF" fontSize="14" fontFamily="monospace">Ø 0.05 Ⓜ</text>
          <text x="237" y="77" fill="#38BDF8" fontSize="15" fontFamily="monospace">A</text>
          <text x="290" y="77" fill="#FFFFFF" fontSize="15" fontFamily="monospace">B</text>
          <text x="342" y="77" fill="#FFFFFF" fontSize="15" fontFamily="monospace">C</text>
          <text x="45" y="28" fill="#CBD5E1" fontSize="10" fontFamily="monospace">TRUE POSITION · MMC MODIFIER · DATUM REFERENCE FRAME</text>
        </svg>
      )}

      {(topic.diagramType === 'pfmea' || topic.diagramType === 'lean' || topic.diagramType === 'rca') && (
        <svg viewBox="0 0 420 150" className="mt-3 w-full" aria-label="Process Control and Quality Loop">
          <rect x="0" y="0" width="420" height="150" rx="8" fill="#0F2547" />
          {[
            { x: 24, label: '01. INPUT' },
            { x: 120, label: '02. ANALYZE' },
            { x: 216, label: '03. CONTROL' },
            { x: 312, label: '04. SUSTAIN' },
          ].map((node, idx) => (
            <g key={node.label}>
              <rect
                x={node.x}
                y="48"
                width="82"
                height="48"
                rx="6"
                fill="#173461"
                stroke={idx % 2 === 0 ? '#60A5FA' : '#38BDF8'}
                strokeWidth="1.4"
              />
              <text
                x={node.x + 41}
                y="76"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9.5"
                fontFamily="monospace"
              >
                {node.label}
              </text>
              {idx < 3 && (
                <line
                  x1={node.x + 82}
                  y1="72"
                  x2={node.x + 96}
                  y2="72"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                />
              )}
            </g>
          ))}
          <text x="24" y="124" fill="#CBD5E1" fontSize="10" fontFamily="monospace">
            {topic.diagramType === 'pfmea'
              ? 'PROCESS ROUTING -> PFMEA RISK -> CONTROL PLAN -> SPC'
              : topic.diagramType === 'lean'
              ? 'SORT (5S) -> SET IN ORDER -> STANDARDIZE -> KAIZEN'
              : 'FISHBONE (6M) -> 5 WHY -> 8D CONTAINMENT -> CAPA CLOSURE'}
          </text>
        </svg>
      )}
    </div>
  );
}

export default function Knowledge() {
  const groups: KnowledgeTopic['group'][] = [
    'CNC Operations',
    'Design & Metrology',
    'Process & Quality',
    'Lean Systems',
  ];

  const [activeGroup, setActiveGroup] = useState<KnowledgeTopic['group']>('CNC Operations');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(KNOWLEDGE_TOPICS[0].id);

  const topicsInGroup = KNOWLEDGE_TOPICS.filter((t) => t.group === activeGroup);
  const activeTopic =
    KNOWLEDGE_TOPICS.find((t) => t.id === selectedTopicId) || topicsInGroup[0];

  const handleGroupSwitch = (grp: KnowledgeTopic['group']) => {
    setActiveGroup(grp);
    const first = KNOWLEDGE_TOPICS.find((t) => t.group === grp);
    if (first) setSelectedTopicId(first.id);
  };

  return (
    <section
      id="knowledge"
      className="relative border-t border-[#D0DCEB] bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#0891B2]">
              ENGINEERING KNOWLEDGE DASHBOARD
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0E1C36] sm:text-4xl text-balance">
              Manufacturing &amp; Machining Technical Reference
            </h2>
            <p className="mt-3 text-base text-[#4A5F7E]">
              Interactive reference modules spanning CNC programming, cutting kinematics, GD&amp;T, PFMEA, Control Plans, Lean 5S, and Root Cause Analysis.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Engineering knowledge groups"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#D0DCEB] bg-[#F5F9FF] p-1.5"
          >
            {groups.map((grp) => (
              <button
                key={grp}
                type="button"
                role="tab"
                aria-selected={activeGroup === grp}
                onClick={() => handleGroupSwitch(grp)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeGroup === grp
                    ? 'bg-[#1463FF] text-white'
                    : 'text-[#4A5F7E] hover:text-[#0E1C36]'
                }`}
              >
                {grp}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-4">
            <p className="px-1 font-mono text-xs font-medium text-[#4A5F7E]">
              TOPICS IN {activeGroup.toUpperCase()} ({topicsInGroup.length})
            </p>
            <div className="space-y-2">
              {topicsInGroup.map((topic) => {
                const isSelected = activeTopic.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-[#1463FF] bg-[#EEF5FF] text-[#0E1C36] font-semibold'
                        : 'border-[#D0DCEB] bg-[#F8FBFF] text-[#4A5F7E] hover:border-[#1463FF]/50 hover:text-[#0E1C36]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen
                        className={`h-4 w-4 shrink-0 ${
                          isSelected ? 'text-[#1463FF]' : 'text-[#0891B2]/75'
                        }`}
                      />
                      <span className="text-sm truncate">
                        {topic.shortTitle}
                      </span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isSelected ? 'text-[#1463FF] translate-x-0.5' : 'text-[#4A5F7E]/50'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-[#D0DCEB] bg-[#F5F9FF] p-4">
              <p className="font-mono text-[11px] font-semibold text-[#0891B2]">
                ALL 14 KNOWLEDGE MODULES
              </p>
              <div className="mt-3 flex flex-wrap gap-x-2.5 gap-y-1.5 text-xs">
                {KNOWLEDGE_TOPICS.map((topic, idx) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setActiveGroup(topic.group);
                      setSelectedTopicId(topic.id);
                    }}
                    className={`transition-colors ${
                      activeTopic.id === topic.id
                        ? 'font-semibold text-[#1463FF] underline underline-offset-4'
                        : 'text-[#4A5F7E] hover:text-[#0E1C36]'
                    }`}
                  >
                    {topic.shortTitle}
                    {idx < KNOWLEDGE_TOPICS.length - 1 ? ' ·' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#D0DCEB] bg-white p-6 sm:p-8 shadow-[0_8px_28px_rgba(14,28,54,0.05)] lg:col-span-8 space-y-6">
            <div className="border-b border-[#DCE6F3] pb-5">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#0891B2]">
                <Layers className="h-3.5 w-3.5" />
                <span>{activeTopic.group}</span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-[#0E1C36]">
                {activeTopic.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4A5F7E]">
                {activeTopic.summary}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
                KEY ENGINEERING PRINCIPLES
              </h4>
              <ul className="mt-3 space-y-2.5">
                {activeTopic.keyPrinciples.map((principle, idx) => (
                  <li
                    key={principle}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[#334A6B]"
                  >
                    <span className="font-mono text-xs font-semibold text-[#1463FF] tabular-nums mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeTopic.referenceFormulaOrCode && (
              <div className="rounded-xl border border-[#B8D2F5] bg-[#EEF5FF] p-4">
                <p className="font-mono text-[11px] font-semibold text-[#1463FF]">
                  {activeTopic.referenceFormulaOrCode.label.toUpperCase()}
                </p>
                <p className="mt-1.5 font-mono text-sm font-semibold text-[#0E1C36]">
                  {activeTopic.referenceFormulaOrCode.expression}
                </p>
                <p className="mt-1 font-mono text-xs text-[#4A5F7E]">
                  {activeTopic.referenceFormulaOrCode.notes}
                </p>
              </div>
            )}

            <TechnicalDiagram topic={activeTopic} />

            <div className="border-t border-[#DCE6F3] pt-4">
              <p className="font-mono text-xs font-semibold text-[#0891B2]">SHOP-FLOOR APPLICATION</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#4A5F7E]">
                {activeTopic.practicalApplication}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
