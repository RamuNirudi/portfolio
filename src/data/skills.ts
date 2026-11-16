export interface SkillCategory {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  focusArea: string;
  iconKey: 'cnc' | 'manufacturing' | 'tooling' | 'quality' | 'lean' | 'software';
  capabilities: {
    name: string;
    application: string;
    depthBands: number; // 1-5 architectural competency bands (qualitative, non-percentage)
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'cnc-machining',
    code: 'A',
    title: 'CNC Machining',
    subtitle: 'Precision multi-axis metal removal, programming & cutting strategy',
    focusArea: 'Spindle Efficiency & Surface Integrity',
    iconKey: 'cnc',
    capabilities: [
      { name: 'CNC Programming', application: 'G/M-code structuring, canned cycles & toolpath verification', depthBands: 5 },
      { name: 'CNC Turning', application: 'OD/ID profiling, grooving, threading & concentricity control', depthBands: 5 },
      { name: 'CNC Milling', application: 'Pocket, contour, face & multi-datum precision milling', depthBands: 5 },
      { name: 'Tool Selection', application: 'Carbide insert grades, chipbreakers & coating matching', depthBands: 5 },
      { name: 'Cutting Parameters', application: 'Cutting speed (Vc), feed/tooth (fz) & depth of cut balancing', depthBands: 5 },
      { name: 'Machining Process Optimization', application: 'Air-cut reduction, chatter suppression & tool-life stability', depthBands: 5 },
    ],
  },
  {
    id: 'manufacturing-engineering',
    code: 'B',
    title: 'Manufacturing Engineering',
    subtitle: 'Scalable process routing from prototype feasibility to full production',
    focusArea: 'Process Routing & NPI Execution',
    iconKey: 'manufacturing',
    capabilities: [
      { name: 'Process Planning', application: 'Operation sequencing, routing sheets & cycle estimation', depthBands: 5 },
      { name: 'Production Engineering', application: 'Shop-floor technical support, bottleneck resolution & uptime', depthBands: 5 },
      { name: 'Process Optimization', application: 'Workflow balancing, setup standardization & repeatability', depthBands: 5 },
      { name: 'New Product Introduction', application: 'DFM reviews, supplier readiness & cross-functional launch', depthBands: 5 },
      { name: 'Prototype Development', application: 'First-article machining, fixture trials & dimensional validation', depthBands: 5 },
      { name: 'Production Ramp-up', application: 'Pilot lot stabilization, SOP release & operator sign-off', depthBands: 4 },
    ],
  },
  {
    id: 'tooling-design',
    code: 'C',
    title: 'Tooling & Design',
    subtitle: 'Custom workholding architecture, metrology gauges & blueprint clarity',
    focusArea: 'Datum Repeatability & GD&T Control',
    iconKey: 'tooling',
    capabilities: [
      { name: 'Jigs and Fixtures', application: '3-2-1 locating principles, clamping rigidity & quick-change', depthBands: 5 },
      { name: 'Gauges', application: 'Go/No-Go attribute gauging & in-process inspection aids', depthBands: 4 },
      { name: 'Tooling Development', application: 'Special form tools, custom arbors & vendor co-design', depthBands: 5 },
      { name: 'Engineering Drawings', application: 'Multi-view orthographic interpretation & revision control', depthBands: 5 },
      { name: 'GD&T', application: 'Datum schemes, true position, flatness, runout & MMC/LMC', depthBands: 5 },
      { name: 'Tolerance Analysis', application: 'Stack-up evaluation between mating machined components', depthBands: 4 },
      { name: 'BOM', application: 'Bill of Materials structuring, raw stock sizing & routing sync', depthBands: 5 },
    ],
  },
  {
    id: 'quality-engineering',
    code: 'D',
    title: 'Quality Engineering',
    subtitle: 'Systematic defect prevention, statistical control & root-cause closure',
    focusArea: 'Zero-Defect Process Governance',
    iconKey: 'quality',
    capabilities: [
      { name: 'Root Cause Analysis', application: 'Structured failure isolation across man, machine & material', depthBands: 5 },
      { name: '5 Why Analysis', application: 'Iterative causal drill-down to systemic process gaps', depthBands: 5 },
      { name: 'Fishbone Diagram', application: 'Ishikawa 6M cause categorization for machining defects', depthBands: 5 },
      { name: '8D', application: 'Eight-discipline containment, verification & recurrence prevention', depthBands: 4 },
      { name: 'CAPA', application: 'Corrective and Preventive Action tracking & effectiveness audits', depthBands: 5 },
      { name: 'SPC', application: 'Statistical Process Control charting & process capability monitoring', depthBands: 4 },
      { name: 'PFMEA', application: 'Process Failure Mode & Effects Analysis risk prioritization', depthBands: 4 },
      { name: 'Control Plans', application: 'Critical-to-quality characteristic inspection frequencies', depthBands: 5 },
    ],
  },
  {
    id: 'continuous-improvement',
    code: 'E',
    title: 'Continuous Improvement',
    subtitle: 'Shop-floor waste elimination, visual management & operational discipline',
    focusArea: 'Lean Execution & Cost Discipline',
    iconKey: 'lean',
    capabilities: [
      { name: 'Lean Manufacturing', application: 'Value stream waste identification & flow standardization', depthBands: 5 },
      { name: '5S', application: 'Sort, Set in Order, Shine, Standardize & Sustain audits', depthBands: 5 },
      { name: 'Kaizen', application: 'Incremental shop-floor improvement events & operator ergonomics', depthBands: 5 },
      { name: 'Cycle Time Reduction', application: 'Toolpath consolidation & non-cutting motion elimination', depthBands: 5 },
      { name: 'Scrap Reduction', application: 'First-pass yield stabilization & burr/chatter mitigation', depthBands: 5 },
      { name: 'Cost Reduction', application: 'Tooling consumption optimization & rework avoidance', depthBands: 4 },
    ],
  },
  {
    id: 'software-tools',
    code: 'F',
    title: 'Software & Tools',
    subtitle: 'Digital CAD modeling, drafting, engineering analytics & ERP integration',
    focusArea: 'CAD/CAM & Production Systems',
    iconKey: 'software',
    capabilities: [
      { name: 'AutoCAD', application: '2D fixture layouts, process sheets & shop-floor schematics', depthBands: 5 },
      { name: 'SolidWorks', application: '3D part modeling, fixture assemblies & interference checks', depthBands: 5 },
      { name: 'MS Excel', application: 'Cycle-time modeling, tolerance sheets & Pareto defect analysis', depthBands: 5 },
      { name: 'ERP/MRP Systems', application: 'BOM management, work order routing & material planning', depthBands: 4 },
    ],
  },
];
