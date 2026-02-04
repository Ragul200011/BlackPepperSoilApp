import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SoilHealthCircle({ score, status }) {
  return (
    <View style={styles.circle}>
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.label}>Soil Health Score</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
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
    marginBottom: 16,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  label: {
    fontSize: 14,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b5e20',
  },
});
