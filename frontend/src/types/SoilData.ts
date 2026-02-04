export interface SoilData {
  moisture: number;
  temperature: number;
  ph: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  timestamp: number;
}
