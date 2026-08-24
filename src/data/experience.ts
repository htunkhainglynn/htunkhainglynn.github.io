export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Your Company',
    position: 'Software Engineer',
    period: '2024 — Present',
    description:
      'Building reliable backend services and improving the systems that support product growth.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Docker'],
    achievements: [
      'Designed and shipped backend services with clear operational ownership.',
      'Improved system observability and reduced time spent diagnosing production issues.',
      'Collaborated across engineering and product to turn ambiguous requirements into maintainable systems.',
    ],
  },
  {
    company: 'Previous Company',
    position: 'Associate Software Engineer',
    period: '2022 — 2024',
    description:
      'Developed APIs and data workflows while strengthening engineering practices across the team.',
    technologies: ['Java', 'Spring', 'MySQL', 'Redis', 'Linux'],
    achievements: [
      'Delivered production APIs and integrations used by core product workflows.',
      'Added automated tests around high-risk business logic and deployment paths.',
    ],
  },
];
