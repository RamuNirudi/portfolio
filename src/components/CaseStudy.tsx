import { useEffect, useState } from 'react';
import { X, Wrench, AlertTriangle, CheckSquare, Edit3, Check } from 'lucide-react';
import type { ProjectCaseStudy } from '../data/projects';

interface CaseStudyProps {
  project: ProjectCaseStudy | null;
  customMetrics: Record<string, string>;
  onUpdateMetric: (metricKey: string, value: string) => void;
  onClose: () => void;
}

export default function CaseStudy({
  project,
  customMetrics,
  onUpdateMetric,
  onClose,
}: CaseStudyProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState('');
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
    setEditingKey(null);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1C36]/60 p-4 sm:p-6 overflow-y-auto backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
    >
      <div
        className="relative my-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#C8D8EC] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#DCE6F3] bg-white/95 px-6 py-4 backdrop-blur-sm">
          <div className="min-w-0">
            <p className="font-mono text-xs font-semibold text-[#0891B2] truncate">
              {project.category}
            </p>
            <h3
              id="case-study-title"
              className="font-display text-lg sm:text-xl font-bold text-[#0E1C36] truncate"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D0DCEB] bg-[#F5F9FF] text-[#4A5F7E] transition-colors hover:border-[#1463FF] hover:text-[#1463FF]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="overflow-hidden rounded-xl border border-[#D0DCEB] bg-[#F2F6FB] lg:col-span-7">
              {!imgFailed ? (
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center p-6 text-center">
                  <Wrench className="h-10 w-10 text-[#1463FF]" />
                  <p className="mt-3 text-sm font-medium text-[#0E1C36]">{project.title}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-[#D0DCEB] bg-[#F5F9FF] p-5 lg:col-span-5">
              <div>
                <p className="font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
                  TECHNICAL PROCESS SHEET
                </p>

                <svg
                  viewBox="0 0 280 90"
                  className="mt-3 w-full rounded-lg border border-[#C8D8EC] bg-[#0F2547] p-2"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern id="bpgrid" width="14" height="14" patternUnits="userSpaceOnUse">
                      <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#38BDF8" strokeOpacity="0.18" strokeWidth="0.6" />
                    </pattern>
                  </defs>
                  <rect width="280" height="90" fill="url(#bpgrid)" />
                  <rect x="24" y="20" width="90" height="50" rx="2" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
                  <circle cx="69" cy="45" r="14" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="12" y1="45" x2="126" y2="45" stroke="#CBD5E1" strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="4 3" />
                  <line x1="145" y1="22" x2="255" y2="22" stroke="#60A5FA" strokeWidth="1.2" />
                  <line x1="145" y1="45" x2="235" y2="45" stroke="#38BDF8" strokeWidth="1.2" />
                  <line x1="145" y1="68" x2="245" y2="68" stroke="#CBD5E1" strokeOpacity="0.6" strokeWidth="1.2" />
                  <text x="145" y="16" fill="#CBD5E1" fontSize="8" fontFamily="monospace">DATUM A / B / C</text>
                  <text x="145" y="39" fill="#38BDF8" fontSize="8" fontFamily="monospace">PROCESS VALIDATION</text>
                  <text x="145" y="62" fill="#CBD5E1" fontSize="8" fontFamily="monospace">CONTROL PLAN</text>
                </svg>

                <dl className="mt-4 space-y-3 text-xs">
                  <div className="border-b border-[#DCE6F3] pb-2">
                    <dt className="font-mono text-[#4A5F7E]">COMPONENT / SCOPE</dt>
                    <dd className="mt-0.5 font-semibold text-[#0E1C36]">
                      {project.blueprintNotes.partFamily}
                    </dd>
                  </div>
                  <div className="border-b border-[#DCE6F3] pb-2">
                    <dt className="font-mono text-[#4A5F7E]">OPERATION FOCUS</dt>
                    <dd className="mt-0.5 font-semibold text-[#0E1C36]">
                      {project.blueprintNotes.operationFocus}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[#4A5F7E]">VERIFICATION</dt>
                    <dd className="mt-0.5 font-semibold text-[#0E1C36]">
                      {project.blueprintNotes.verificationMethod}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
                PROJECT OVERVIEW
              </h4>
              <p className="text-sm leading-relaxed text-[#4A5F7E]">
                {project.overview}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
                <AlertTriangle className="h-3.5 w-3.5 text-[#1463FF]" />
                <span>ENGINEERING CHALLENGE</span>
              </h4>
              <p className="text-sm leading-relaxed text-[#4A5F7E]">
                {project.challenge}
              </p>
            </div>
          </div>

          <div className="border-t border-[#DCE6F3] pt-6">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
              TECHNICAL APPROACH
            </h4>
            <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {project.approach.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-xl border border-[#D0DCEB] bg-[#F5F9FF] p-4 text-sm leading-relaxed text-[#334A6B]"
                >
                  <span className="font-mono text-xs font-semibold text-[#1463FF] tabular-nums">
                    0{i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#DCE6F3] pt-6">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
              TOOLS &amp; TECHNIQUES APPLIED
            </h4>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#0E1C36]">
              {project.toolsAndTechniques.map((tool, i) => (
                <span key={tool} className="inline-flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckSquare className="h-3.5 w-3.5 text-[#1463FF]" />
                    <span>{tool}</span>
                  </span>
                  {i < project.toolsAndTechniques.length - 1 && (
                    <span aria-hidden="true" className="text-[#CBD8EA]">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#DCE6F3] pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-mono text-xs font-semibold tracking-wider text-[#0891B2]">
                RESULTS &amp; MEASURABLE IMPACT (EDITABLE PLACEHOLDERS)
              </h4>
              <span className="text-xs text-[#4A5F7E]">
                Confidential figures withheld — click edit to populate verified values
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {project.impactFields.map((field) => {
                const metricKey = `${project.id}:${field.label}`;
                const displayValue = customMetrics[metricKey] ?? field.placeholderValue;
                const isEditing = editingKey === metricKey;

                return (
                  <div
                    key={field.label}
                    className="rounded-xl border border-[#D0DCEB] bg-[#F5F9FF] p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-medium text-[#4A5F7E]">
                        {field.label}
                      </span>
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingKey(metricKey);
                            setDraftValue(displayValue);
                          }}
                          aria-label={`Edit ${field.label}`}
                          className="rounded p-1 text-[#4A5F7E] hover:bg-[#E2ECF7] hover:text-[#1463FF]"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            onUpdateMetric(metricKey, draftValue.trim() || field.placeholderValue);
                            setEditingKey(null);
                          }}
                          aria-label={`Save ${field.label}`}
                          className="rounded p-1 text-[#1463FF] hover:bg-[#E2ECF7]"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <input
                        type="text"
                        value={draftValue}
                        onChange={(e) => setDraftValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onUpdateMetric(metricKey, draftValue.trim() || field.placeholderValue);
                            setEditingKey(null);
                          }
                        }}
                        className="mt-2 w-full rounded border border-[#1463FF] bg-white px-2.5 py-1.5 font-mono text-xs text-[#0E1C36] focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <p className="mt-2 font-mono text-sm font-semibold text-[#0E1C36] tabular-nums">
                        {displayValue}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-[#4A5F7E]">{field.note}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
