import { View, Text, ScrollView } from "react-native";
import { useBluetooth } from "@/hooks/useBluetooth";
import ParameterCard from "@/components/ParameterCard";
import SoilHealthGauge from "@/components/SoilHealthGauge";
import { calculateSoilHealth } from "@/constants/soilHealth";

export default function Dashboard() {
  const data = useBluetooth();

  const score = data ? calculateSoilHealth(data) : 0;

  return (
    <ScrollView className="p-4 bg-[#f5f1e8]">
      <Text className="text-xl font-bold mb-4">
        🌱 Black Pepper Soil Health
      </Text>

      {/* Soil Health */}
      <SoilHealthGauge value={score} />

      {/* Live Data */}
      {data ? (
        <View className="flex-row flex-wrap justify-between mt-6">
          <ParameterCard label="Nitrogen" value={data.N} unit="mg/kg" />
          <ParameterCard label="Phosphorus" value={data.P} unit="mg/kg" />
          <ParameterCard label="Potassium" value={data.K} unit="mg/kg" />
          <ParameterCard label="Soil pH" value={data.pH} unit="" />
          <ParameterCard label="Moisture" value={data.moisture} unit="%" />
          <ParameterCard label="Temperature" value={data.temperature} unit="°C" />
        </View>
      ) : (
        <Text className="mt-6 text-gray-500">
          Connecting to soil sensor...
        </Text>
      )}
    </ScrollView>
  );
}
