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
    company: 'Wave Money',
    position: 'Platform Developer',
    period: 'Jun 2025 — Present',
    description:
      'Leading backend work for cross-border financial services and banking integrations in Myanmar’s fintech ecosystem.',
    technologies: ['Java', 'Spring Boot', 'REST APIs', 'Financial Systems'],
    achievements: [
      'Led the backend design and implementation of the 2C2P Wave App, enabling instant remittances from Thailand to WavePay wallets and more than 60,000 Wave agents across Myanmar.',
      'Designed bank integration services and OTC cash-in/cash-out workflows with local banking partners.',
      'Maintained and optimized the Wave agent–Yoma Bank cash-in/cash-out integration for reliable, secure, and scalable transaction flows.',
    ],
  },
  {
    company: 'Wave Money',
    position: 'Java Developer · Contract',
    period: 'Nov 2023 — Jun 2025',
    description:
      'Contributed to Wave Money’s Java backend systems during a contract engagement before moving into the Platform Developer role.',
    technologies: ['Java', 'Hibernate', 'SQL', 'Git'],
    achievements: [
      'Built experience delivering and maintaining backend software in a large-scale financial-services environment.',
    ],
  },
];
