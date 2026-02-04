import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSoilData = async (data) => {
  await AsyncStorage.setItem('soilData', JSON.stringify(data));
};

export const getSoilData = async () => {
  const data = await AsyncStorage.getItem('soilData');
  return data ? JSON.parse(data) : null;
};
