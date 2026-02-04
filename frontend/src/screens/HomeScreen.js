import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SoilHealthCircle from '../components/SoilHealthCircle';
import StatCard from '../components/StatCard';
import ActionButton from '../components/ActionButton';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Soil Health Dashboard</Text>

      <SoilHealthCircle score={94} status="Excellent" />

      <Text style={styles.section}>Quick Status</Text>
      <View style={styles.grid}>
        <StatCard label="Nitrogen" value="45" unit="mg/kg" />
        <StatCard label="Phosphorus" value="28" unit="mg/kg" />
        <StatCard label="Potassium" value="180" unit="mg/kg" />
        <StatCard label="pH" value="6.2" />
        <StatCard label="Moisture" value="65" unit="%" />
        <StatCard label="Temp" value="26" unit="°C" />
      </View>

      <Text style={styles.section}>Quick Actions</Text>
      <View style={styles.actions}>
        <ActionButton title="View Sensors" />
        <ActionButton title="Get Insights" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f8f4',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1b5e20',
  },
  section: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
});
