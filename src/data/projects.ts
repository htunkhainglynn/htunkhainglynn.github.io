export interface Project {
  name: string;
  description: string;
  technologies: string[];
  repository?: string;
  demo?: string;
  demoLabel?: string;
  featured?: boolean;
  challenges: string[];
}

export const projects: Project[] = [
  {
    name: '2C2P Wave App',
    description:
      'Cross-border remittance infrastructure enabling Myanmar nationals in Thailand to send money instantly to recipients in Myanmar.',
    technologies: ['Java', 'Spring Boot', 'REST APIs', 'FinTech'],
    demo: 'https://wavemoney.com.mm/2c2p-wave-app',
    demoLabel: 'Product page',
    featured: true,
    challenges: [
      'Designed secure backend systems and APIs for remittances between Thailand and Myanmar.',
      'Supported instant transfers to WavePay wallets and cash access through more than 60,000 Wave agents.',
      'Connected cross-border payment flows to multiple recipient channels while preserving reliable transaction behavior.',
    ],
  },
  {
    name: 'Wave–Yoma Bank Linkage',
    description:
      'Integration supporting cash-in and cash-out transactions between Wave’s agent network and Yoma Bank.',
    technologies: ['Java', 'Bank APIs', 'Transaction Systems'],
    demo: 'https://www.yomabank.com/en/personal/wavepay-linkage/',
    demoLabel: 'Service details',
    featured: true,
    challenges: [
      'Maintained reliable and secure transaction flows across organizational boundaries.',
      'Optimized the integration to support scalable cash-in and cash-out operations.',
    ],
  },
  {
    name: 'Local Bank Integration Services',
    description:
      'Backend integration services connecting Wave’s financial platform with local banking partners.',
    technologies: ['Java', 'Spring Boot', 'Bank APIs', 'OTC Workflows'],
    challenges: [
      'Designed robust over-the-counter cash-in and cash-out workflows.',
      'Improved accessibility by connecting partner-bank services with Wave transaction channels.',
    ],
  },
];
