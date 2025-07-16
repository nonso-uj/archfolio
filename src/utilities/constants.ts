export const SOFTWARE_LIST = [
  { label: 'AutoCAD', value: 'autocad' },
  { label: 'Revit', value: 'revit' },
  { label: 'SketchUp', value: 'sketchup' },
  { label: 'Rhino (Rhinoceros 3D)', value: 'rhino' },
  { label: 'Grasshopper', value: 'grasshopper' },
  { label: 'ArchiCAD', value: 'archicad' },
  { label: 'Vectorworks', value: 'vectorworks' },
  { label: '3ds Max', value: '3dsmax' },
  { label: 'Lumion', value: 'lumion' },
  { label: 'V-Ray', value: 'vray' },
  { label: 'Enscape', value: 'enscape' },
  { label: 'Twinmotion', value: 'twinmotion' },
  { label: 'Blender', value: 'blender' },
  { label: 'Adobe Photoshop', value: 'photoshop' },
  { label: 'Adobe Illustrator', value: 'illustrator' },
  { label: 'Adobe InDesign', value: 'indesign' },
  { label: 'Navisworks', value: 'navisworks' },
  { label: 'AutoDesk FormIt', value: 'formit' },
  { label: 'Sketchfab', value: 'sketchfab' },
  { label: 'BIM 360', value: 'bim360' },
]

export const SKILLS_OBJECT = {
  autocad: '/img/logos/autocad.png',
  revit: '/img/logos/revit.png',
  sketchup: '/img/logos/sketchup.svg',
  rhino: '/img/logos/rhino.png',
  grasshopper: '/img/logos/grasshopper.png',
  archicad: '/img/logos/archicad.png',
  vectorworks: '/img/logos/vectorworks.png',
  '3dsmax': '/img/logos/3dsmax.png',
  lumion: '/img/logos/lumion.png',
  vray: '/img/logos/vray.png',
  enscape: '/img/logos/enscape.png',
  twinmotion: '/img/logos/twinmotion.png',
  blender: '/img/logos/blender.png',
  photoshop: '/img/logos/photoshop.png',
  illustrator: '/img/logos/illustrator.png',
  indesign: '/img/logos/indesign.png',
  navisworks: '/img/logos/navisworks.png',
  formit: '/img/logos/formit.png',
  sketchfab: '/img/logos/sketchfab.png',
  bim360: '/img/logos/bim360.png',
} as const

export type SkillKey = keyof typeof SKILLS_OBJECT

export const SKILLS_PLACEHOLDER = [
  'autocad',
  'revit',
  'sketchup',
  'rhino',
  'grasshopper',
  'archicad',
  'vectorworks',
  '3dsmax',
  'lumion',
  'vray',
  'enscape',
  'twinmotion',
  'blender',
  'photoshop',
  'illustrator',
  'indesign',
  'navisworks',
  'formit',
  'sketchfab',
  'bim360',
]

export const ABOUT_PLACEHOLDER =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&aps;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'

export const PICTURES_PLACEHOLDER = [
  '/img/render/rest/img21.jpg',
  '/img/render/rest/img24.jpg',
  '/img/render/rest/img27.jpg',
  '/img/render/rest/img31.jpg',
  '/img/render/rest/img34.jpg',
  '/img/render/rest/img38.jpg',
  '/img/render/rest/img41.jpg',
  '/img/render/rest/img44.jpg',
  '/img/render/rest/img47.jpg',
  '/img/render/rest/img50.jpg',
]

export const TOPWORKS_PLACEHOLDER = [
  {
    title: 'Abuja Project',
    desc: 'Residential',
    pic: '/img/render/render1.jpg',
    url: '',
  },
  {
    title: 'Lagos Project',
    desc: 'Commercial',
    pic: '/img/render/render2.jpg',
    url: '',
  },
  {
    title: 'Kano Project',
    desc: 'Educational',
    pic: '/img/render/render3.jpg',
    url: '',
  },
  {
    title: 'Enugu Project',
    desc: 'Residential',
    pic: '/img/render/render4.jpg',
    url: '',
  },
]

export const EXPERIENCE_DUMMY = [
  {
    role: 'Junior Architect — Zaha Hadid Architects',
    startDate: 'Jan 2018',
    endDate: 'Dec 2019',
  },
  {
    role: 'Project Architect — Foster + Partners',
    startDate: 'Jan 2020',
    endDate: 'Aug 2022',
  },
  {
    role: 'Freelance Architect & Urban Designer',
    startDate: 'Sep 2022',
    endDate: 'Present',
  },
]

export const SERVICES_DUMMY = [
  'Schematic Design',
  '3D Visualization',
  'Sustainable Design',
  'Urban Planning',
  'Interior Architecture',
  'Construction Documentation',
  'Feasibility Studies',
  'Project Management',
]

export const CONTACT_DUMMY = [
  { name: 'Email', link: 'mailto:arch.janedoe@example.com' },
  { name: 'LinkedIn', link: 'https://linkedin.com/in/janedoe-architect' },
  { name: 'Instagram', link: 'https://instagram.com/janedoe_architecture' },
]

export const SOCIAL_ARRAY = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'behance', label: 'Behance' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'reddit', label: 'Reddit' },
];