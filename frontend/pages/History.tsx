import { ScrollView, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function History() {
  return (
    <ScrollView className="bg-background p-4">
      <Text className="text-xl font-bold text-primary mb-4">
        Soil Health History
      </Text>

      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [{ data: [65, 70, 68, 75, 80] }]
        }}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: () => "#2E7D32",
        }}
        bezier
      />
    </ScrollView>
  );
}
