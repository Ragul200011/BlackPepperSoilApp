export const getSensorData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  
  return {
    nitrogen: { value: 45, unit: 'mg/kg', status: 'warning' },
    phosphorus: { value: 28, unit: 'mg/kg', status: 'good' },
    potassium: { value: 180, unit: 'mg/kg', status: 'good' },
    ph: { value: 6.2, unit: 'pH', status: 'good' },
    moisture: { value: 65, unit: '%', status: 'good' },
    temperature: { value: 26, unit: '°C', status: 'good' },
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    lastUpdate: new Date(),
  };
};

export const calculateSoilHealth = (data) => {
  if (!data) return 0;
  
  let score = 0;
  let weights = {
    nitrogen: 20,
    phosphorus: 15,
    potassium: 15,
    ph: 25,
    moisture: 15,
    temperature: 10,
  };
  
  // Nitrogen scoring (optimal: 50-70 mg/kg)
  const nValue = data.nitrogen.value;
  if (nValue >= 50 && nValue <= 70) score += weights.nitrogen;
  else if (nValue >= 40 && nValue < 90) score += weights.nitrogen * 0.7;
  else score += weights.nitrogen * 0.3;
  
  // Phosphorus scoring (optimal: 20-35 mg/kg)
  const pValue = data.phosphorus.value;
  if (pValue >= 20 && pValue <= 35) score += weights.phosphorus;
  else if (pValue >= 15 && pValue < 45) score += weights.phosphorus * 0.7;
  else score += weights.phosphorus * 0.3;
  
  // Potassium scoring (optimal: 150-250 mg/kg)
  const kValue = data.potassium.value;
  if (kValue >= 150 && kValue <= 250) score += weights.potassium;
  else if (kValue >= 100 && kValue < 300) score += weights.potassium * 0.7;
  else score += weights.potassium * 0.3;
  
  // pH scoring (optimal: 5.5-6.5 for black pepper)
  const phValue = data.ph.value;
  if (phValue >= 5.5 && phValue <= 6.5) score += weights.ph;
  else if (phValue >= 5.0 && phValue < 7.0) score += weights.ph * 0.7;
  else score += weights.ph * 0.3;
  
  // Moisture scoring (optimal: 60-75%)
  const mValue = data.moisture.value;
  if (mValue >= 60 && mValue <= 75) score += weights.moisture;
  else if (mValue >= 50 && mValue < 85) score += weights.moisture * 0.7;
  else score += weights.moisture * 0.3;
  
  // Temperature scoring (optimal: 23-28°C)
  const tValue = data.temperature.value;
  if (tValue >= 23 && tValue <= 28) score += weights.temperature;
  else if (tValue >= 20 && tValue < 32) score += weights.temperature * 0.7;
  else score += weights.temperature * 0.3;
  
  return Math.round(score);
};

export const getRecommendations = async (sensorData) => {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  
  const recommendations = [];
  
  // Nitrogen recommendation
  if (sensorData.nitrogen.value < 50) {
    recommendations.push({
      id: 1,
      type: 'fertilizer',
      priority: 'high',
      title: 'Nitrogen Deficiency Detected',
      description: 'Apply nitrogen-rich fertilizer to improve leaf growth and overall plant vigor.',
      action: 'Apply NPK 20-10-10 fertilizer',
      dosage: '250g per plant',
      frequency: 'Every 3 months',
      details: 'Black pepper requires adequate nitrogen for vegetative growth. Low nitrogen leads to yellowing leaves and stunted growth. Apply urea or organic compost rich in nitrogen.',
    });
  }
  
  // pH recommendation
  if (sensorData.ph.value > 6.5) {
    recommendations.push({
      id: 2,
      type: 'soil',
      priority: 'medium',
      title: 'Soil pH Slightly High',
      description: 'Black pepper prefers slightly acidic soil. Consider acidifying amendments.',
      action: 'Apply sulfur or organic matter',
      dosage: '100g sulfur per sq meter',
      frequency: 'Once every 6 months',
      details: 'Optimal pH for black pepper is 5.5-6.5. High pH can reduce nutrient availability. Use elemental sulfur or add organic compost to gradually lower pH.',
    });
  }
  
  // Variety recommendation based on conditions
  const varietyRec = {
    id: 3,
    type: 'variety',
    priority: 'medium',
    title: 'Recommended Black Pepper Variety',
    description: 'Based on your soil conditions, we recommend the following variety:',
    action: 'Consider Panniyur 1 variety',
    dosage: 'N/A',
    frequency: 'N/A',
    details: 'Panniyur 1 is a high-yielding variety that performs well in moderate soil conditions with good drainage. It shows excellent resistance to common diseases and produces quality berries.',
  };
  
  if (sensorData.ph.value >= 6.0) {
    varietyRec.action = 'Consider Panniyur 1 or Sreekara variety';
    varietyRec.details = 'Panniyur 1 and Sreekara varieties adapt well to slightly alkaline conditions and show good disease resistance.';
  } else if (sensorData.ph.value < 6.0 && sensorData.moisture.value > 65) {
    varietyRec.action = 'Consider Karimunda variety';
    varietyRec.details = 'Karimunda is ideal for acidic, moisture-rich soils. It produces bold berries with high essential oil content and shows excellent adaptation to humid conditions.';
  }
  
  recommendations.push(varietyRec);
  
  // General soil improvement
  recommendations.push({
    id: 4,
    type: 'insight',
    priority: 'low',
    title: 'Soil Health Optimization',
    description: 'Regular monitoring and organic matter addition improve long-term soil health.',
    action: 'Add organic compost monthly',
    dosage: '2-3 kg per plant',
    frequency: 'Monthly',
    details: 'Incorporate well-decomposed organic matter (FYM, compost) to improve soil structure, water retention, and microbial activity. This enhances nutrient availability and root development.',
  });
  
  // Moisture management
  if (sensorData.moisture.value < 60) {
    recommendations.push({
      id: 5,
      type: 'irrigation',
      priority: 'high',
      title: 'Moisture Level Below Optimal',
      description: 'Black pepper requires consistent moisture for healthy growth.',
      action: 'Increase irrigation frequency',
      dosage: '20-30 liters per plant',
      frequency: 'Every 3-4 days',
      details: 'Maintain soil moisture at 60-75%. Install drip irrigation for efficient water use. Mulch around plants to retain moisture and reduce evaporation.',
    });
  }
  
  return recommendations;
};

export const getHistoricalData = async () => {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  
  const data = [];
  const today = new Date();
  
  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      nitrogen: Math.round(40 + Math.random() * 20 + Math.sin(i / 10) * 5),
      phosphorus: Math.round(25 + Math.random() * 10 + Math.sin(i / 15) * 3),
      potassium: Math.round(170 + Math.random() * 30 + Math.sin(i / 12) * 10),
      ph: Number((6.0 + Math.random() * 0.5 + Math.sin(i / 20) * 0.2).toFixed(1)),
      moisture: Math.round(60 + Math.random() * 15 + Math.sin(i / 8) * 5),
      temperature: Math.round(24 + Math.random() * 4 + Math.sin(i / 7) * 2),
    });
  }
  
  return data;
};

export const blackPepperVarieties = [
  {
    name: 'Panniyur 1',
    optimalPH: '5.8-6.5',
    optimalMoisture: '60-70%',
    description: 'High-yielding variety with good disease resistance',
  },
  {
    name: 'Karimunda',
    optimalPH: '5.5-6.2',
    optimalMoisture: '65-75%',
    description: 'Bold berries with high essential oil content',
  },
  {
    name: 'Sreekara',
    optimalPH: '5.8-6.8',
    optimalMoisture: '60-70%',
    description: 'Excellent for slightly alkaline soils',
  },
  {
    name: 'Panchami',
    optimalPH: '5.5-6.5',
    optimalMoisture: '60-75%',
    description: 'Vigorous growth with consistent yields',
  },
];