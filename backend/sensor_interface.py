# sensor_interface.py
# ------------------------------
# Handles all sensor interactions (Simulation, Hardware, ThingSpeak)

import random
import time
from config import USE_SIMULATION, SERIAL_PORT, BAUDRATE, SENSOR_ID, TIMEOUT, FUNCTION_CODE, TS_CHANNEL, TS_KEY
import requests

def get_sensor_data(mode="Simulation Mode"):
    """
    Returns sensor readings as a dictionary.
    Supports Simulation Mode, Live Sensor Mode, and ThingSpeak Cloud.
    """
    data = {
        "Temperature": 0.0, "Moisture": 0.0,
        "Nitrogen": 0.0, "Phosphorus": 0.0, "Potassium": 0.0,
        "pH": 0.0, "Humidity": 0.0
    }

    if mode == "Simulation Mode" or USE_SIMULATION:
        # Random realistic values for demo
        data["Temperature"] = round(random.uniform(22.0, 35.0), 1)
        data["Moisture"] = round(random.uniform(40.0, 80.0), 1)
        data["Nitrogen"] = round(random.uniform(100, 250), 0)
        data["Phosphorus"] = round(random.uniform(10, 60), 0)
        data["Potassium"] = round(random.uniform(150, 300), 0)
        data["pH"] = round(random.uniform(5.5, 7.5), 2)
        data["Humidity"] = round(random.uniform(60.0, 90.0), 1)
        time.sleep(0.2)
        return data

    elif mode == "ThingSpeak Cloud":
        try:
            url = f"https://api.thingspeak.com/channels/{TS_CHANNEL}/feeds.json?api_key={TS_KEY}&results=1"
            resp = requests.get(url, timeout=5)
            resp.raise_for_status()
            feed = resp.json()
            latest = feed['feeds'][-1]
            data["Temperature"] = float(latest.get("field1") or 0)
            data["Moisture"] = float(latest.get("field2") or 0)
            data["Nitrogen"] = float(latest.get("field3") or 0)
            data["Phosphorus"] = float(latest.get("field4") or 0)
            data["Potassium"] = float(latest.get("field5") or 0)
            data["pH"] = float(latest.get("field6") or 0)
            data["Humidity"] = float(latest.get("field7") or 0)
            return data
        except Exception as e:
            print(f"ThingSpeak Error: {e}")
            return None

    elif mode == "Live Sensor Mode":
        try:
            import minimalmodbus
            instrument = minimalmodbus.Instrument(SERIAL_PORT, SENSOR_ID)
            instrument.serial.baudrate = BAUDRATE
            instrument.serial.timeout = TIMEOUT
            instrument.serial.bytesize = 8
            instrument.serial.parity = minimalmodbus.serial.PARITY_NONE
            instrument.serial.stopbits = 1
            instrument.mode = minimalmodbus.MODE_RTU
            instrument.clear_buffers_before_each_transaction = True

            data["Temperature"] = instrument.read_register(0,1,functioncode=FUNCTION_CODE)
            data["Moisture"] = instrument.read_register(1,1,functioncode=FUNCTION_CODE)
            data["Nitrogen"] = instrument.read_register(2,0,functioncode=FUNCTION_CODE)
            data["Phosphorus"] = instrument.read_register(3,0,functioncode=FUNCTION_CODE)
            data["Potassium"] = instrument.read_register(4,0,functioncode=FUNCTION_CODE)
            data["pH"] = instrument.read_register(5,1,functioncode=FUNCTION_CODE)
            data["Humidity"] = instrument.read_register(6,1,functioncode=FUNCTION_CODE)
            return data
        except Exception as e:
            print(f"Hardware Sensor Error: {e}")
            return None
