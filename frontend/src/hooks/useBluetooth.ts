import { useEffect, useState } from "react";
import { BleManager } from "react-native-ble-plx";
import { SoilData } from "@/types/SoilData";
import { saveReading } from "@/utils/storage";

export function useBluetooth() {
  const [sensorData, setSensorData] = useState<SoilData | null>(null);

  useEffect(() => {
    const manager = new BleManager();

    const startScan = async () => {
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) return;

        if (device?.name === "BlackPepperSoilSensor") {
          manager.stopDeviceScan();

          device
            .connect()
            .then(d => d.discoverAllServicesAndCharacteristics())
            .then(d => {
              d.monitorCharacteristicForService(
                "12345678-1234-1234-1234-1234567890ab",
                "abcd1234-1234-5678-1234-abcdef123456",
                (err, c) => {
                  if (c?.value) {
                    const json = atob(c.value);

                    const parsed = JSON.parse(json);

                    const data: SoilData = {
                      ...parsed,
                      timestamp: Date.now(),
                    };

                    setSensorData(data);
                    saveReading(data);
                  }
                }
              );
            });
        }
      });
    };

    startScan();

    return () => {
      manager.destroy();
    };
  }, []);

  return sensorData;
}
