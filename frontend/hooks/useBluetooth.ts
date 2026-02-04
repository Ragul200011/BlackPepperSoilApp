export type BluetoothDevice = {
  id: string;
  name?: string;
};

export function useBluetooth() {
  const scanDevices = (): BluetoothDevice[] => {
    // BLE is disabled in Expo Go
    // This is a mock implementation
    return [];
  };

  const connectDevice = (deviceId: string): boolean => {
    // Always false in mock mode
    return false;
  };

  return {
    scanDevices,
    connectDevice,
  };
}
