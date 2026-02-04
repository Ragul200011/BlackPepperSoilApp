import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function ActionButton({ title }) {
return (
<TouchableOpacity style={styles.button}>
<Text style={styles.text}>{title}</Text>
</TouchableOpacity>
);
}


const styles = StyleSheet.create({
button: {
width: '48%',
padding: 14,
backgroundColor: '#2e7d32',
borderRadius: 10,
alignItems: 'center'
},
text: { color: '#fff', fontWeight: '600' }
});