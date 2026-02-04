const normalize = (value, min, max) => {
  if (value < min || value > max) return 0;
  return 100;
};

export const calculateSoilHealth = (data) => {
  const score =
    normalize(data.N, 40, 60) * 0.2 +
    normalize(data.P, 25, 40) * 0.15 +
    normalize(data.K, 50, 70) * 0.15 +
    normalize(data.pH, 5.5, 6.8) * 0.2 +
    normalize(data.moisture, 40, 60) * 0.2 +
    normalize(data.temperature, 25, 32) * 0.1;

  return Math.round(score);
};
