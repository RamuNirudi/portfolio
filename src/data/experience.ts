export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  periodTag: string;
  location: string;
  summary: string;
  focusDomains: string[];
  responsibilities: string[];
  deliverables: string[];
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'principle-acs',
    company: 'Principle ACS',
    position: 'Senior Manufacturing Engineer',
    duration: 'March 2023 – Present',
    periodTag: 'Current Role',
    location: 'Hyderabad, Telangana, India',
    summary:
      'Leading manufacturing process architecture, CNC machining optimization, NPI validation, and cross-functional continuous improvement across production operations.',
    focusDomains: [
      'CNC Machining Leadership',
      'NPI & Production Ramp-up',
      'GD&T & BOM Review',
      'Lean & 5S Governance',
    ],
    responsibilities: [
      'Led manufacturing process development and optimization.',
      'Provided technical leadership for CNC machining, tooling, fixtures and production improvements.',
      'Led NPI, prototype, process validation and production ramp-up activities.',
      'Analyzed manufacturing issues and implemented root-cause and corrective actions.',
      'Worked on reducing cycle time, scrap, rework, downtime and manufacturing costs.',
      'Reviewed engineering drawings, GD&T, BOMs and manufacturing requirements.',
      'Coordinated with Design, Production, Quality, Supply Chain and suppliers.',
      'Led Lean Manufacturing, Kaizen and 5S initiatives.',
      'Mentored junior engineers and standardized manufacturing documentation.',
    ],
    deliverables: [
      'Standardized process documentation & work instructions',
      'Cross-functional NPI readiness & prototype validation packages',
      'Root-cause corrective action closures & Kaizen improvements',
    ],
  },
  {
    id: 'saideepa-rock-drills',
    company: 'Saideepa Rock Drills',
    position: 'Manufacturing Engineer',
    duration: 'March 2020 – 2023',
    periodTag: '3 Years',
    location: 'Hyderabad, Telangana, India',
    summary:
      'Developed robust machining processes, workholding tooling, SOP documentation, and shop-floor troubleshooting for precision industrial drilling components.',
    focusDomains: [
      'Process Planning & SOPs',
      'Tooling & Fixture Support',
      'Root-Cause Analysis',
      'Prototype & Kaizen Execution',
    ],
    responsibilities: [
      'Developed and optimized manufacturing processes.',
      'Supported CNC machining, tooling and fixture development.',
      'Prepared process plans, SOPs and work instructions.',
      'Troubleshot production and machining issues.',
      'Performed root-cause analysis.',
      'Improved cycle time, scrap, rework and production downtime.',
      'Supported new product development and prototype builds.',
      'Implemented Lean Manufacturing, 5S and Kaizen initiatives.',
    ],
    deliverables: [
      'Operation-level process plans, SOPs & operator work instructions',
      'CNC fixture & workholding support for precision machined components',
      'Shop-floor 5S & Kaizen implementation records',
    ],
  },
];
