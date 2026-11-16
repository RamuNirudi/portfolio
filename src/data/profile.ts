export interface CareerHighlight {
  value: string;
  label: string;
  detail: string;
}

export interface EducationRecord {
  degree: string;
  field: string;
  institution: string;
  location: string;
  duration: string;
  cgpa: string;
}

export const PROFILE_DATA = {
  brandMonogram: 'NR',
  brandWordmark: 'RAMU NIRUDI',
  fullName: 'Nirudi Ramu',
  title: 'Senior Manufacturing Engineer | CNC Specialist',
  location: 'Hyderabad, Telangana, India',
  phone: '9848899022',
  email: 'nirudiramu118@gmail.com',
  formSubmitEmail: 'nirudiramu118@gmail.com',
  linkedinPlaceholderUrl: 'https://www.linkedin.com/in/nirudi-ramu',
  logoImage: '/logo-face.png',
  portraitImage: '/assets/aistudio/ram_pic_58da190a.jpeg',
  heroHeadlineLine1: 'ENGINEERING PRECISION.',
  heroHeadlineLine2: 'BUILDING PERFORMANCE.',
  heroSummary:
    "I'm Nirudi Ramu (Ramu Nirudi), a Senior Manufacturing Engineer with 6+ years of experience in CNC machining, manufacturing process optimization, production engineering, tooling development and continuous improvement.",
  heroMetaPoints: [
    '6+ Years of Experience',
    'CNC & Manufacturing Engineering',
    'Production Process Optimization',
    'Hyderabad, Telangana, India',
  ],
  aboutHeading: 'ENGINEERING EXPERIENCE. PRECISION THINKING.',
  aboutParagraphs: [
    'Nirudi Ramu — also known professionally as Ramu Nirudi — is a Senior Manufacturing Engineer with a Bachelor of Technology in Mechanical Engineering and over six years of hands-on leadership across CNC machining and production engineering in Hyderabad, India.',
    'Across roles at Saideepa Rock Drills and Principle ACS, I have led manufacturing process development, production optimization, custom jigs and fixture development, GD&T drawing interpretation, and cross-functional New Product Introduction (NPI) from prototype validation through stable production ramp-up.',
    'Equally committed to quality and continuous improvement, I apply structured Root Cause Analysis (5 Why, Fishbone, 8D, CAPA), PFMEA, Control Plans, Lean Manufacturing, 5S, and Kaizen methodologies while mentoring junior engineers and standardizing manufacturing documentation across Design, Quality, Production, and Supply Chain teams.',
  ],
  aboutPillars: [
    {
      title: 'Mechanical Engineering Foundation',
      detail: 'B.Tech in Mechanical Engineering with strong grounding in tolerances, metallurgy, and kinematics.',
    },
    {
      title: 'CNC Machining & Process Planning',
      detail: 'End-to-end CNC turning and milling process design, parameter selection, and cycle optimization.',
    },
    {
      title: 'Tooling, Fixtures & GD&T',
      detail: 'Workholding jigs, checking gauges, BOM validation, and strict GD&T drawing interpretation.',
    },
    {
      title: 'NPI, Quality & Lean Leadership',
      detail: 'Prototype builds, process validation, 8D/CAPA root-cause elimination, 5S, and Kaizen deployment.',
    },
  ],
};

export const EDUCATION_DATA: EducationRecord = {
  degree: 'Bachelor of Technology',
  field: 'Mechanical Engineering',
  institution: 'Gokaraju Rangaraju Institute of Engineering and Technology',
  location: 'Hyderabad, Telangana, India',
  duration: '2016 – 2019',
  cgpa: '8.2 / 10',
};

export const CAREER_HIGHLIGHTS: CareerHighlight[] = [
  {
    value: '6+ Years',
    label: 'Professional Experience',
    detail: 'Continuous progression from Manufacturing Engineer to Senior Manufacturing Engineer.',
  },
  {
    value: '2',
    label: 'Professional Organizations',
    detail: 'Principle ACS (2023 – Present) and Saideepa Rock Drills (2020 – 2023).',
  },
  {
    value: '1',
    label: 'Mechanical Engineering Degree',
    detail: 'Bachelor of Technology from GRIET, Hyderabad (2016 – 2019).',
  },
  {
    value: '8.2 / 10',
    label: 'Academic CGPA',
    detail: 'Verified undergraduate academic standing in Mechanical Engineering.',
  },
];
