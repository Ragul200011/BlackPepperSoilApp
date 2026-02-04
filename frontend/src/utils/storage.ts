import AsyncStorage from "@react-native-async-storage/async-storage";
import { SoilData } from "@/types/SoilData";

const KEY = "SOIL_HISTORY";

export async function saveReading(data: SoilData) {
  const existing = await AsyncStorage.getItem(KEY);
  const history = existing ? JSON.parse(existing) : [];
  history.push(data);
  await AsyncStorage.setItem(KEY, JSON.stringify(history));
}

export async function getHistory(): Promise<SoilData[]> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}
