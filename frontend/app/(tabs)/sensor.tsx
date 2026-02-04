import { View, Text, StyleSheet } from 'react-native';
import { useBluetooth } from '@/hooks/useBluetooth';

export default function SensorScreen() {
  const data = useBluetooth();

  if (!data) return <Text>Reading sensor data...</Text>;

  return (
    <View style={styles.container}>
      <Text>Nitrogen: {data.N}</Text>
      <Text>Phosphorus: {data.P}</Text>
      <Text>Potassium: {data.K}</Text>
      <Text>pH: {data.pH}</Text>
      <Text>Moisture: {data.moisture}%</Text>
      <Text>Temperature: {data.temperature}°C</Text>
      <Text>Live Sensor Data</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 16 }});
