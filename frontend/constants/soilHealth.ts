// constants/soilHealth.ts

interface SoilSensorData {
  N: number;
  P: number;
  K: number;
  pH: number;
  moisture: number;
  temperature: number;
}

/**
 * Normalize a value into 0–100 range
 */
function normalize(value: number, min: number, max: number): number {
  if (value <= min) return 0;
  if (value >= max) return 100;
  return ((value - min) / (max - min)) * 100;
}

/**
 * Calculate overall Soil Health Score for Black Pepper
 */
export function calculateSoilHealth(data: SoilSensorData): number {
  const nScore = normalize(data.N, 40, 60);
  const pScore = normalize(data.P, 20, 35);
  const kScore = normalize(data.K, 150, 250);
  const phScore = normalize(data.pH, 5.5, 6.5);
  const moistureScore = normalize(data.moisture, 60, 80);
  const tempScore = normalize(data.temperature, 25, 32);

  const totalScore =
    nScore * 0.20 +
    pScore * 0.15 +
    kScore * 0.20 +
    phScore * 0.20 +
    moistureScore * 0.15 +
    tempScore * 0.10;

  return Math.round(totalScore);
}
