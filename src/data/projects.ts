export interface Project {
  name: string;
  description: string;
  technologies: string[];
  repository: string;
  demo?: string;
  featured?: boolean;
  challenges: string[];
}

export const projects: Project[] = [
  {
    name: 'Event-driven Order Platform',
    description:
      'A reference backend for exploring reliable event processing, transactional boundaries, and service ownership.',
    technologies: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Docker'],
    repository: 'https://github.com/htunkhainglynn',
    featured: true,
    challenges: [
      'Kept database writes and event publication consistent with an outbox workflow.',
      'Designed consumers to be idempotent under retries and duplicate delivery.',
      'Made failure states observable without coupling services together.',
    ],
  },
  {
    name: 'Distributed Job Runner',
    description:
      'A small distributed scheduler built to study leases, retry semantics, backpressure, and worker coordination.',
    technologies: ['Go', 'PostgreSQL', 'gRPC', 'Docker'],
    repository: 'https://github.com/htunkhainglynn',
    featured: true,
    challenges: [
      'Prevented duplicate ownership while allowing work to recover after a crashed worker.',
      'Separated retryable failures from terminal failures with bounded backoff.',
    ],
  },
  {
    name: 'Database Notes',
    description:
      'Executable notes and experiments covering indexes, isolation levels, query plans, and storage behavior.',
    technologies: ['PostgreSQL', 'SQL', 'Python'],
    repository: 'https://github.com/htunkhainglynn',
    challenges: [
      'Turned abstract database concepts into reproducible benchmarks and examples.',
      'Documented the tradeoffs behind each test instead of reporting results in isolation.',
    ],
  },
];
