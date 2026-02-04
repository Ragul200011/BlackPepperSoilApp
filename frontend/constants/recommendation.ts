export function getFertilizer(data: any) {
  if (data.N < 40) {
    return "Apply Urea 50kg/ha";
  }

  if (data.pH < 5.5) {
    return "Apply Dolomite 200kg/ha";
  }

  if (data.K < 150) {
    return "Apply MOP 40kg/ha";
  }

  return "Soil condition optimal for black pepper";
}
