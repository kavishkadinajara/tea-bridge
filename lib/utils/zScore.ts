export function zScore(value: number, mean: number, stdDev: number): number {
    return (value - mean) / stdDev;
  }
  