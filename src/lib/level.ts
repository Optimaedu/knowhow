const levelDescriptions: Record<number, string> = {
  0: 'Easy',
  1: 'Medium',
  2: 'Hard',
  3: 'Extreme',
};

export default function getLevelDescription(level: number): string {
  return levelDescriptions[level];
}

