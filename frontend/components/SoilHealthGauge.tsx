import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function SoilHealthGauge({ value }: { value: number }) {
  return (
    <View className="bg-white rounded-2xl p-6 items-center shadow">
      <AnimatedCircularProgress
        size={180}
        width={14}
        fill={value}
        tintColor="#2E7D32"
        backgroundColor="#E0E0E0"
        rotation={0}
      >
        {() => (
          <View className="items-center">
            <Text className="text-3xl font-bold text-primary">
              {value}
            </Text>
            <Text className="text-gray-500">out of 100</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <Text className="mt-3 text-lg font-semibold text-primary">
        Soil Health Score
      </Text>
      <Text className="text-green-600 font-medium">
        Excellent
      </Text>
      <Text className="text-xs text-gray-400 mt-1">
        Last synced: 5 min ago
      </Text>
    </View>
  );
}
