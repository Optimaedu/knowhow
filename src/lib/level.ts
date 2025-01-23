const levelDescriptions: Record<number, string> = {
  0: 'easy',
  1: 'medium',
  2: 'hard',
  3: 'extreme',
};

export default function getLevelDescription(level: number): string {
  return levelDescriptions[level];
}

