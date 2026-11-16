export interface KnowledgeTopic {
  id: string;
  group: 'CNC Operations' | 'Design & Metrology' | 'Process & Quality' | 'Lean Systems';
  title: string;
  shortTitle: string;
  summary: string;
  keyPrinciples: string[];
  practicalApplication: string;
  referenceFormulaOrCode?: {
    label: string;
    expression: string;
    notes: string;
  };
  diagramType: 'gcode' | 'speeds' | 'gdt' | 'pfmea' | 'lean' | 'workholding' | 'rca';
}

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: 'gcode-mcode',
    group: 'CNC Operations',
    title: 'CNC G-Codes and M-Codes',
    shortTitle: 'G-Codes & M-Codes',
    summary:
      'Preparatory (G) functions govern toolpath geometry, coordinate systems, and canned cycles, while Miscellaneous (M) functions control machine hardware states such as spindle rotation, coolant delivery, and tool changes.',
    keyPrinciples: [
      'G00 (Rapid Positioning) vs G01 (Linear Feed Interpolation) vs G02/G03 (Circular Interpolation)',
      'Work Offset Datums (G54–G59) aligning CAD origin to physical fixture zero',
      'Canned cycles (G81 drilling, G83 peck drilling, G71/G70 turning rough/finish) for compact, readable code',
      'M03/M04/M05 spindle control, M06 automatic tool change, M08/M09 coolant control, M30 program end & rewind',
    ],
    practicalApplication:
      'Reviewing modal safety blocks (G17 G21 G40 G49 G80 G90) at program headers prevents catastrophic crashes during dry runs and shift restarts.',
    referenceFormulaOrCode: {
      label: 'Standard Milling Safe-Start Block',
      expression: 'G17 G21 G40 G49 G80 G90; G54 M06 T01; S3200 M03; M08;',
      notes: 'XY Plane · Metric mm · Cancel Cutter Comp & Tool Offset · Absolute · Datum G54',
    },
    diagramType: 'gcode',
  },
  {
    id: 'turning-milling',
    group: 'CNC Operations',
    title: 'CNC Turning and Milling',
    shortTitle: 'Turning & Milling',
    summary:
      'Turning rotates the workpiece against a stationary single-point insert for cylindrical symmetry, whereas milling rotates a multi-flute cutter across stationary prismatic or contoured workpieces.',
    keyPrinciples: [
      'Turning: Constant Surface Speed (G96) vs Constant RPM (G97) for facing and parting operations',
      'Milling: Climb (down) milling preferred on rigid CNC ballscrews for superior surface finish and reduced work hardening',
      'Radial engagement (ae) and axial depth (ap) control chip thinning and spindle torque load',
      'Concentricity, perpendicularity, and datum transfer between OP10 turning and OP20 milling setups',
    ],
    practicalApplication:
      'Balancing stock removal rates across turning roughing passes and multi-axis milling finishing passes preserves tool geometry and prevents part distortion.',
    diagramType: 'workholding',
  },
  {
    id: 'cutting-speed-feed',
    group: 'CNC Operations',
    title: 'Cutting Speed and Feed Rate',
    shortTitle: 'Speeds & Feeds',
    summary:
      'Calibrating surface speed (Vc), spindle RPM (n), and feed rate (Vf) governs chip load, cutting temperature, tool flank wear, and achieved surface roughness (Ra).',
    keyPrinciples: [
      'Surface speed (Vc in m/min) is dictated by workpiece alloy hardness and carbide/ceramic insert coating',
      'Spindle speed n = (1000 × Vc) / (π × D) scales inversely with tool or workpiece diameter',
      'Milling table feed Vf = n × z × fz depends on flute count (z) and chip load per tooth (fz)',
      'Excessive speed accelerates crater/flank wear; insufficient feed causes rubbing and work hardening',
    ],
    practicalApplication:
      'Use the interactive Speed & Feed Calculator below to verify spindle RPM and table feed rates across different cutter diameters and tooth loads.',
    referenceFormulaOrCode: {
      label: 'Core Machining Kinematics',
      expression: 'n = (1000 · Vc) / (π · D)   |   Vf = n · z · fz',
      notes: 'Vc: m/min · D: mm · n: RPM · z: flutes · fz: mm/tooth · Vf: mm/min',
    },
    diagramType: 'speeds',
  },
  {
    id: 'tool-selection',
    group: 'CNC Operations',
    title: 'Tool Selection',
    shortTitle: 'Tool Selection',
    summary:
      'Selecting substrate grade, PVD/CVD coating, lead angle, and chipbreaker geometry ensures predictable chip evacuation and dimensional control across steel, stainless, cast iron, and aluminum.',
    keyPrinciples: [
      'ISO Material Groups: P (Steel), M (Stainless), K (Cast Iron), N (Non-Ferrous), S (Superalloys), H (Hardened)',
      'Chipbreaker geometry matched to finishing, medium, or heavy roughing depth of cut',
      'Nose radius (0.4 mm vs 0.8 mm vs 1.2 mm) balancing edge strength against radial chatter and theoretical Ra',
      'Minimize tool overhang (L/D ratio ≤ 4:1 where possible) or deploy carbide/damped boring bars for deep pockets',
    ],
    practicalApplication:
      'Standardizing insert grades across machine families simplifies crib inventory while maintaining optimal surface speed per alloy.',
    diagramType: 'gcode',
  },
  {
    id: 'workholding-fixtures',
    group: 'Design & Metrology',
    title: 'Workholding and Fixtures',
    shortTitle: 'Workholding & Fixtures',
    summary:
      'Fixtures must locate the workpiece deterministically without over-constraining it, absorb cutting forces into solid supports, and allow fast, error-proof loading.',
    keyPrinciples: [
      '3-2-1 Locating Principle: 3 primary plane supports, 2 secondary line stops, 1 tertiary point stop (6 DOF constrained)',
      'Diamond pin + round pin pairing prevents binding across hole-center tolerance variations',
      'Clamp forces should always direct downward into fixed datum pads, never onto unsupported overhangs',
      'Poka-yoke (mistake-proofing) pins prevent inverted or rotated part loading by operators',
    ],
    practicalApplication:
      'Rigid dedicated fixtures directly reduce setup time, eliminate manual tramming, and stabilize true-position tolerances.',
    diagramType: 'workholding',
  },
  {
    id: 'gdt-fundamentals',
    group: 'Design & Metrology',
    title: 'GD&T Fundamentals',
    shortTitle: 'GD&T Fundamentals',
    summary:
      'Geometric Dimensioning and Tolerancing (ASME Y14.5 / ISO 1101) defines functional tolerance zones relative to physical Datums (A, B, C) rather than ambiguous plus-minus box zones.',
    keyPrinciples: [
      'Form controls (Flatness, Straightness, Circularity, Cylindricity) require no datum reference',
      'Orientation controls (Perpendicularity, Parallelism, Angularity) control tilt relative to datums',
      'Location controls (True Position, Concentricity, Symmetry) establish cylindrical or planar tolerance zones',
      'Material Condition Modifiers (MMC Ⓜ / LMC Ⓛ) grant bonus tolerance as feature size departs from worst-case boundary',
    ],
    practicalApplication:
      'Inspecting feature control frames early in NPI prevents fixture datum mismatches between machining setups and CMM inspection programs.',
    diagramType: 'gdt',
  },
  {
    id: 'drawing-interpretation',
    group: 'Design & Metrology',
    title: 'Engineering Drawing Interpretation',
    shortTitle: 'Drawing Interpretation',
    summary:
      'Accurate blueprint reading extracts projection standards, general tolerance tables (ISO 2768), surface finish callouts (Ra/Rz), heat-treatment notes, and critical-to-quality flags.',
    keyPrinciples: [
      'First-angle vs Third-angle orthographic projection verification prior to CAM programming',
      'Title block general tolerances, material specifications, and post-machining plating allowances',
      'Section views, detail callouts, thread specifications (metric/UNC pitch & class), and chamfer/deburr notes',
      'Revision level tracking across active shop-floor travelers and ERP BOMs',
    ],
    practicalApplication:
      'Creating stage drawings separates pre-heat-treat stock allowances from final ground or hard-turned dimensions.',
    diagramType: 'gdt',
  },
  {
    id: 'tolerance-analysis',
    group: 'Design & Metrology',
    title: 'Tolerance Analysis',
    shortTitle: 'Tolerance Analysis',
    summary:
      'Tolerance stack-up analysis quantifies worst-case and statistical (RSS) variation across mating machined features to ensure reliable assembly clearance or interference.',
    keyPrinciples: [
      'Worst-Case (Arithmetic) Stack-Up guarantees 100% interchangeability at extreme tolerance limits',
      'Root Sum Square (RSS) models realistic normal process distribution when Cpk is controlled',
      'Datum chain minimization avoids cumulative error across multi-setup re-clamping',
      'Balancing functional assembly need against machining cost and achievable CNC capability',
    ],
    practicalApplication:
      'Adjusting internal process tolerances tighter than print limits compensates for fixture wear and thermal expansion.',
    diagramType: 'gdt',
  },
  {
    id: 'process-planning',
    group: 'Process & Quality',
    title: 'Manufacturing Process Planning',
    shortTitle: 'Process Planning',
    summary:
      'Process planning sequences raw material preparation, rough machining, stress relief, finishing operations, deburring, and final metrology into repeatable shop-floor routings.',
    keyPrinciples: [
      'Operation sequencing: establish primary datums first, rough heavy stock before finish passes',
      'Cycle time estimation separating load/unload, spindle cut, rapid index, and in-process gauging',
      'Clear SOPs and visual work instructions specifying clamping torque, insert grade, and gauge checks',
      'ERP/MRP routing alignment with work-center capacity and tooling lead times',
    ],
    practicalApplication:
      'Well-structured routing sheets ensure any qualified machinist achieves identical cycle time and part quality.',
    diagramType: 'pfmea',
  },
  {
    id: 'pfmea',
    group: 'Process & Quality',
    title: 'PFMEA (Process Failure Mode & Effects Analysis)',
    shortTitle: 'PFMEA',
    summary:
      'PFMEA systematically identifies potential failure modes at every manufacturing step, evaluates Severity, Occurrence, and Detection, and drives preventive controls before production defects occur.',
    keyPrinciples: [
      'Step-by-step analysis from raw stock receiving through CNC operations to final pack-out',
      'Severity (customer/assembly impact), Occurrence (failure frequency), Detection (control effectiveness)',
      'Action Priority (AP) / RPN reduction focused on prevention (poka-yoke) over downstream inspection',
      'Living document updated after every engineering change (ECN) or 8D corrective action',
    ],
    practicalApplication:
      'Linking PFMEA high-risk items directly into fixture mistake-proofing and automated CNC probing lowers field defect risk.',
    diagramType: 'pfmea',
  },
  {
    id: 'control-plans',
    group: 'Process & Quality',
    title: 'Control Plans',
    shortTitle: 'Control Plans',
    summary:
      'Control Plans operationalize PFMEA findings on the shop floor by specifying exact inspection gauges, sample sizes, check frequencies, and reaction plans for every product and process characteristic.',
    keyPrinciples: [
      'Distinct Prototype, Pre-Launch, and Production Control Plan phases',
      'Maps CTQ dimensions, measurement instrument resolution (10:1 gauge rule), and sample frequency',
      'Explicit Reaction Plan instructions empowering operators when an out-of-tolerance reading occurs',
      'Synchronized with SPC charts and first-piece / last-piece inspection sign-offs',
    ],
    practicalApplication:
      'Clear reaction plans stop suspect lot propagation immediately at the machine rather than at final audit.',
    diagramType: 'pfmea',
  },
  {
    id: 'lean-manufacturing',
    group: 'Lean Systems',
    title: 'Lean Manufacturing',
    shortTitle: 'Lean Manufacturing',
    summary:
      'Lean manufacturing systematically eliminates the 8 wastes (TIMWOODS: Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects, Skills) to maximize value-added machining flow.',
    keyPrinciples: [
      'Distinguish true value-added cutting time from non-value-added setup, handling, and inspection delays',
      'Single-Minute Exchange of Die (SMED): convert internal machine-stopped setup steps to external prep',
      'Standardized work stabilizes cycle repeatability across shifts and operators',
      'Pull-based cell flow prevents excess WIP queues between turning, milling, and deburring stations',
    ],
    practicalApplication:
      'Separating tool pre-setting offline from machine spindle uptime unlocks capacity without capital expenditure.',
    diagramType: 'lean',
  },
  {
    id: '5s-kaizen',
    group: 'Lean Systems',
    title: '5S and Kaizen',
    shortTitle: '5S & Kaizen',
    summary:
      '5S establishes visual workplace discipline so abnormalities surface immediately, while Kaizen drives continuous, incremental improvements led by shop-floor engineering and production teams.',
    keyPrinciples: [
      'Sort (Seiri), Set in Order (Seiton), Shine (Seiso), Standardize (Seiketsu), Sustain (Shitsuke)',
      'Shadow boards for wrenches, collets, and inspection gauges eliminate search waste',
      'Kaizen events target small, high-frequency ergonomic, chip-control, or fixture loading bottlenecks',
      'Layered audits keep workplace standards active beyond initial launch',
    ],
    practicalApplication:
      'Clean, organized CNC bays directly correlate with lower setup errors, faster maintenance response, and higher operator safety.',
    diagramType: 'lean',
  },
  {
    id: 'root-cause-analysis',
    group: 'Process & Quality',
    title: 'Root Cause Analysis',
    shortTitle: 'Root Cause Analysis',
    summary:
      'Structured problem-solving isolates true physical and systemic root causes behind machining defects or downtime rather than applying temporary symptom patches.',
    keyPrinciples: [
      'Fishbone (Ishikawa) 6M mapping: Man, Machine, Material, Method, Measurement, Mother Nature (Environment)',
      '5 Why iterative interrogation verifies each causal link with physical shop-floor evidence',
      '8D Discipline: D1 Team, D2 Problem, D3 Containment, D4 Root Cause, D5/D6 Corrective Action, D7 Prevention, D8 Recognition',
      'CAPA effectiveness verification confirms zero defect recurrence over subsequent production lots',
    ],
    practicalApplication:
      'Pairing metrology evidence with 5-Why logic eliminates guesswork when resolving chatter, tool breakage, or datum drift.',
    diagramType: 'rca',
  },
];
