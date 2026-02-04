import { View, Text, StyleSheet } from 'react-native';

export default function RecommendationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fertilizer Recommendation</Text>
      <Text>Urea: 120g per vine</Text>
      <Text>MOP: 90g per vine</Text>
      <Text>Recommended Variety: Panniyur-1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold' }
});
