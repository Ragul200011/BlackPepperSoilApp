import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export const scanESP32 = (onDataReceived) => {
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) return;

    if (device.name === 'ESP32_SOIL_SENSOR') {
      manager.stopDeviceScan();

      device.connect()
        .then(dev => dev.discoverAllServicesAndCharacteristics())
        .then(dev => {
          dev.monitorCharacteristicForService(
            'SERVICE_UUID',
            'CHARACTERISTIC_UUID',
            (err, char) => {
              if (!err) {
                const raw = atob(char.value);
                onDataReceived(JSON.parse(raw));
              }
            }
          );
        });
    }
  });
};
