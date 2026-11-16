export interface ProjectMetricField {
  label: string;
  placeholderValue: string;
  note: string;
}

export interface ProjectCaseStudy {
  id: string;
  category: string;
  title: string;
  image: string;
  imageAlt: string;
  overview: string;
  challenge: string;
  approach: string[];
  toolsAndTechniques: string[];
  impactFields: ProjectMetricField[];
  blueprintNotes: {
    partFamily: string;
    operationFocus: string;
    verificationMethod: string;
  };
}

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    id: 'cnc-process-optimization',
    category: 'CNC Machining Process Optimization',
    title: 'Multi-Operation CNC Cycle & Toolpath Standardization',
    image: '/src/assets/images/project_cnc_optimization_1794839105381.jpg',
    imageAlt: '5-axis CNC milling spindle machining precision aluminum billet',
    overview:
      'Systematic evaluation and restructuring of CNC turning and milling sequences to stabilize cutting forces, eliminate redundant tool changes, and strengthen dimensional repeatability across batch production.',
    challenge:
      'Elevated non-cutting rapid travel, inconsistent insert wear patterns, and suboptimal roughing-to-finishing stock allowances created variability in cycle stability and surface finish across shifts.',
    approach: [
      'Audited existing CNC G/M-code programs line by line to isolate excessive air-cut movements and redundant tool indexing.',
      'Recalibrated cutting speed (Vc), feed per tooth (fz), and axial/radial depth of cut aligned with carbide grade manufacturer limits.',
      'Standardized roughing, semi-finishing, and finishing tool lists with documented offset control sheets for operators.',
      'Validated thermal and dimensional drift across consecutive machined batches before locking standard parameters.',
    ],
    toolsAndTechniques: [
      'CNC Turning & Milling',
      'Cutting Parameter Optimization',
      'Tool Selection & Chipbreaker Matching',
      'Process Planning & SOPs',
      'Cycle Time Study',
    ],
    impactFields: [
      {
        label: 'Cycle Time Delta',
        placeholderValue: '[Editable Placeholder: __% / __ min per part]',
        note: 'Confidential production timing — populate during private technical interview',
      },
      {
        label: 'Tool Life Improvement',
        placeholderValue: '[Editable Placeholder: __ parts per insert edge]',
        note: 'Controlled shop-floor benchmark field',
      },
      {
        label: 'Production Efficiency',
        placeholderValue: '[Editable Placeholder: Standardized across __ shifts]',
        note: 'Editable verified operational metric',
      },
    ],
    blueprintNotes: {
      partFamily: '[Confidential Precision Machined Component]',
      operationFocus: 'Roughing / Finishing Toolpath & Spindle Load Balancing',
      verificationMethod: 'First-Article Inspection & In-Process SPC Checks',
    },
  },
  {
    id: 'tooling-fixture-development',
    category: 'Tooling and Fixture Development',
    title: 'Precision Workholding Fixture & Datum Accuracy Architecture',
    image: '/src/assets/images/project_tooling_fixture_1794839104980.jpg',
    imageAlt: 'Custom CNC workholding jig and modular fixture plate with clamps',
    overview:
      'Design and shop-floor deployment of rigid, repeatable CNC workholding fixtures and dedicated inspection gauges engineered to maintain tight GD&T relationships during multi-face machining.',
    challenge:
      'Conventional general-purpose clamping introduced micro-deflection under heavy milling loads and required time-consuming manual dial indication during part changeovers.',
    approach: [
      'Applied 3-2-1 locating principles in SolidWorks and AutoCAD to establish unambiguous primary, secondary, and tertiary datums.',
      'Engineered hardened locating pins, positive stop blocks, and balanced clamping points to minimize part distortion.',
      'Coordinated with toolroom and fixture suppliers on material selection, heat treatment, and ground reference surfaces.',
      'Introduced dedicated Go/No-Go gauges at the machine station for immediate operator verification.',
    ],
    toolsAndTechniques: [
      'SolidWorks & AutoCAD',
      'Jigs & Fixtures Design',
      'GD&T Datum Alignment',
      'Attribute Gauges',
      'Tolerance Stack-up Analysis',
    ],
    impactFields: [
      {
        label: 'Setup Changeover Time',
        placeholderValue: '[Editable Placeholder: Reduced to __ min]',
        note: 'Confidential changeover benchmark',
      },
      {
        label: 'Dimensional Repeatability',
        placeholderValue: '[Editable Placeholder: Within ±__ mm GD&T band]',
        note: 'Datum position & flatness stability',
      },
      {
        label: 'Rework Incidence',
        placeholderValue: '[Editable Placeholder: __% reduction vs baseline]',
        note: 'Editable confidential quality metric',
      },
    ],
    blueprintNotes: {
      partFamily: '[Confidential Multi-Face Machined Housing]',
      operationFocus: '3-2-1 Datum Locking & Clamping Deflection Control',
      verificationMethod: 'CMM Datum Verification & Fixture Qualification Lot',
    },
  },
  {
    id: 'npi-prototype-rampup',
    category: 'New Product Introduction (NPI)',
    title: 'NPI Feasibility, Prototype Validation & Production Ramp-Up',
    image: '/src/assets/images/project_npi_prototype_1794839106171.jpg',
    imageAlt: 'Precision machined prototype metallic components beside engineering drawings and digital caliper',
    overview:
      'End-to-end manufacturing ownership for new component introductions — translating engineering blueprints and BOMs into validated machining processes ready for scaled production.',
    challenge:
      'New product designs frequently arrived with tight geometric tolerances and complex internal features requiring rapid DFM feedback, prototype tooling trials, and zero-surprise handoff to production.',
    approach: [
      'Conducted early Design for Manufacturability (DFM) reviews covering GD&T tolerances, internal radii, and raw stock allowances.',
      'Authored BOM-aligned process routings, stage drawings, and prototype machining plans.',
      'Managed first-article prototype builds alongside Design, Quality, and Supply Chain stakeholders.',
      'Completed pilot-lot process validation, PFMEA, Control Plans, and operator training prior to production ramp-up.',
    ],
    toolsAndTechniques: [
      'NPI & Prototype Development',
      'BOM & Drawing Review',
      'PFMEA & Control Plans',
      'Cross-Functional Coordination',
      'ERP/MRP Routing',
    ],
    impactFields: [
      {
        label: 'Prototype Lead Time',
        placeholderValue: '[Editable Placeholder: __ days from drawing freeze]',
        note: 'Confidential NPI schedule metric',
      },
      {
        label: 'First-Article Yield',
        placeholderValue: '[Editable Placeholder: __ / __ critical dimensions met]',
        note: 'Editable validation summary',
      },
      {
        label: 'Ramp-Up Readiness',
        placeholderValue: '[Editable Placeholder: __% SOP & Control Plan coverage]',
        note: 'Production release sign-off status',
      },
    ],
    blueprintNotes: {
      partFamily: '[Confidential NPI Assembly Component]',
      operationFocus: 'DFM Review, Pilot Build Validation & Production Transfer',
      verificationMethod: 'First Article Inspection Report (FAIR) & Pilot Capability Audit',
    },
  },
  {
    id: 'quality-root-cause-analysis',
    category: 'Quality and Root Cause Analysis',
    title: 'Structured 8D & 5-Why Defect Elimination Program',
    image: '/src/assets/images/project_quality_metrology_1794839106360.jpg',
    imageAlt: 'Coordinate measuring machine inspecting precision CNC machined steel shaft',
    overview:
      'Cross-functional quality engineering investigation using 5 Why, Fishbone (Ishikawa), SPC, and 8D CAPA frameworks to isolate and permanently resolve recurring machining non-conformances.',
    challenge:
      'Intermittent bore taper, surface roughness deviations, and burr formation on critical machined features caused sorting delays and threatened downstream assembly fitment.',
    approach: [
      'Executed immediate containment and stratified defect data across machine spindles, shifts, and raw material lots.',
      'Facilitated Fishbone (6M) and 5-Why workshops with CNC operators, Quality inspectors, and Maintenance engineers.',
      'Isolated root causes spanning coolant concentration drift, tool overhang deflection, and worn collet runout.',
      'Implemented irreversible CAPA controls, updated Control Plans, and monitored SPC trends to verify sustained closure.',
    ],
    toolsAndTechniques: [
      'Root Cause Analysis',
      '5 Why & Fishbone Diagram',
      '8D & CAPA',
      'SPC & Control Plans',
      'PFMEA Updates',
    ],
    impactFields: [
      {
        label: 'Scrap & Rejection Trend',
        placeholderValue: '[Editable Placeholder: __% reduction post-CAPA]',
        note: 'Confidential internal quality KPI',
      },
      {
        label: 'Process Capability (Cpk)',
        placeholderValue: '[Editable Placeholder: Cpk __ -> __]',
        note: 'Editable SPC verification target',
      },
      {
        label: 'Recurrence Status',
        placeholderValue: '[Editable Placeholder: __ consecutive lots defect-free]',
        note: '8D D7/D8 closure verification',
      },
    ],
    blueprintNotes: {
      partFamily: '[Confidential Precision Shaft / Bore Component]',
      operationFocus: 'Runout Control, Tool Overhang & Coolant Stability',
      verificationMethod: 'CMM Metrology & Ongoing SPC Control Charting',
    },
  },
  {
    id: 'lean-continuous-improvement',
    category: 'Lean Manufacturing and Continuous Improvement',
    title: 'Shop-Floor 5S, Kaizen & Waste Standardization Initiative',
    image: '/src/assets/images/project_lean_manufacturing_1794839106567.jpg',
    imageAlt: 'Clean modern CNC manufacturing facility with shadow-boarded tool racks and floor markings',
    overview:
      'Deployment of structured 5S workplace organization, point-of-use tool shadow boards, and standardized Kaizen workflows across CNC machining cells to cut motion waste and downtime.',
    challenge:
      'Operators spent excess time searching for shared gauges, collets, and hex keys across cells, while inconsistent shift handovers extended machine idle time.',
    approach: [
      'Mapped operator movement and tool retrieval delays across active CNC turning and milling stations.',
      'Executed full 5S rollout: red-tag sorting, shadow-boarded tool stations, color-coded gauge trays, and floor demarcation.',
      'Established standardized shift-handover checklists and visual SOP boards directly at each machine console.',
      'Mentored junior manufacturing engineers and cell leads to sustain weekly 5S audits and Kaizen suggestion tracking.',
    ],
    toolsAndTechniques: [
      'Lean Manufacturing',
      '5S Implementation',
      'Kaizen Workshops',
      'Standardized Work Instructions',
      'Visual Factory Controls',
    ],
    impactFields: [
      {
        label: 'Tool Search & Idle Time',
        placeholderValue: '[Editable Placeholder: Reduced by __ min/shift]',
        note: 'Confidential cell time-study placeholder',
      },
      {
        label: '5S Audit Compliance',
        placeholderValue: '[Editable Placeholder: __ / __ audit score]',
        note: 'Internal plant audit metric',
      },
      {
        label: 'Standardized Cells',
        placeholderValue: '[Editable Placeholder: Deployed across __ workstations]',
        note: 'Editable facility rollout scope',
      },
    ],
    blueprintNotes: {
      partFamily: 'Multi-Cell CNC Machining Bay',
      operationFocus: 'Point-of-Use Tooling, Visual SOPs & Shift Handover Flow',
      verificationMethod: 'Weekly Layered 5S Audits & Downtime Log Review',
    },
  },
];
