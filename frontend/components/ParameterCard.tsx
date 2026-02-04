import { View, Text } from "react-native";

interface Props {
  label: string;
  value: number;
  unit: string;
}

export default function ParameterCard({ label, value, unit }: Props) {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-md w-[48%] mb-4">
      <Text className="text-gray-500 text-sm">{label}</Text>
      <Text className="text-2xl font-bold text-green-700">
        {value} <Text className="text-sm">{unit}</Text>
      </Text>
    </View>
  );
}
