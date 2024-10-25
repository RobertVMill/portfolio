// lib/projects.ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  technologies: string[];
  category: 'development' | 'product' | 'fintech';
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
}

export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'Personal portfolio built with Next.js 14, TypeScript, and Tailwind CSS.',
    longDescription: 'A modern, responsive portfolio website showcasing my work and experience in product management and development.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    category: 'development',
    links: {
      github: 'https://github.com/RobertVMill/portfolio',
      live: 'https://portfolio-theta-seven-70.vercel.app/'
    },
    features: [
      'Responsive design',
      'Blog system',
      'Project showcase',
      'Contact form integration',
      'Analytics tracking'
    ],
    challenges: [
      'Implementing dynamic routing',
      'Setting up proper TypeScript configurations',
      'Optimizing performance'
    ],
    outcomes: [
      'Improved site performance',
      'Better user experience',
      'Enhanced SEO'
    ]
  },
  {
    slug: 'banking-dashboard',
    title: 'Banking Dashboard',
    description: 'A comprehensive banking dashboard for monitoring financial metrics.',
    longDescription: 'Enterprise-level banking dashboard built for CIBC to monitor and analyze financial data.',
    technologies: ['React', 'Node.js', 'D3.js', 'AWS'],
    category: 'fintech',
    links: {},
    features: [
      'Real-time data visualization',
      'Custom analytics dashboard',
      'User authentication',
      'Report generation'
    ],
    challenges: [
      'Handling large datasets',
      'Ensuring security compliance',
      'Building scalable architecture'
    ],
    outcomes: [
      'Improved decision making',
      'Reduced analysis time by 50%',
      'Enhanced data accuracy'
    ]
  }
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  console.log('Looking for project with slug:', slug);
  const project = projects.find(project => project.slug === slug);
  console.log('Found project:', project);
  return project;
}

export function getProjectsByCategory(category: Project['category']) {
  return projects.filter(project => project.category === category);
}