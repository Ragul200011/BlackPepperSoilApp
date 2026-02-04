import { View, Text, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { getHistory } from "@/utils/storage";
import { SoilData } from "@/types/SoilData";


export default function History() {
  const [data, setData] = useState<SoilData[]>([]);

  useEffect(() => {
    getHistory().then(setData);
  }, []);

  return (
   <ScrollView style={{ padding: 16 }}>
<Text style={{ fontSize: 20, fontWeight: "bold" }}>
        📈 Soil Health History
      </Text>

      {data.length > 0 && (
        <LineChart
          data={{
            labels: data.map(d =>
              new Date(d.timestamp).toLocaleDateString()
            ),
            datasets: [{ data: data.map(d => d.moisture) }],
          }}
          width={Dimensions.get("window").width - 30}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: () => "#16a34a",
          }}
          style={{ borderRadius: 16 }}
        />
      )}
    </ScrollView>
  );
}
