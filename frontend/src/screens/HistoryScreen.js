import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HistoryScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Soil History</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>2024-03-01</Text>
        <Text>Nitrogen: 45 mg/kg</Text>
        <Text>pH: 6.2</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>2024-02-15</Text>
        <Text>Nitrogen: 42 mg/kg</Text>
        <Text>pH: 6.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: { fontSize: 48, fontWeight: 'bold', color: '#2e7d32' },
  label: { fontSize: 14 },
  status: { fontSize: 16, fontWeight: '600', color: '#1b5e20' },
});
