import { View, Text } from "react-native";
import { useBluetooth } from "@/hooks/useBluetooth";
import { getFertilizer } from "@/constants/recommendation";

export default function Recommendations() {
  const data = useBluetooth();
  const recommendation = data ? getFertilizer(data) : "Waiting for data...";

  return (
    <View className="p-4">
      <Text className="text-xl font-bold text-primary">
        Fertilizer Recommendation
      </Text>

      <View className="mt-4 bg-green-100 p-4 rounded-xl">
        <Text className="text-green-800 font-semibold">
          {recommendation}
        </Text>
      </View>
    </View>
  );
}
