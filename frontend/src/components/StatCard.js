import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function StatCard({ label, value, unit }) {
return (
<View style={styles.card}>
<Text style={styles.value}>{value}{unit ? unit : ''}</Text>
<Text style={styles.label}>{label}</Text>
</View>
);
}


const styles = StyleSheet.create({
card: {
width: '48%',
padding: 12,
backgroundColor: '#ffffff',
borderRadius: 10,
marginBottom: 10,
elevation: 2
},
value: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32' },
label: { fontSize: 12 }
});