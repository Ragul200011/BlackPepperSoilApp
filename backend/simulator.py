# simulator.py
# ------------------------------
# Generates fake sensor readings for demo mode

import random
import time

def read_simulated_sensor():
    """
    Returns simulated soil sensor readings.
    """
    data = {
        "Temperature": round(random.uniform(22.0, 35.0), 1),
        "Moisture": round(random.uniform(40.0, 80.0), 1),
        "Nitrogen": round(random.uniform(100, 250), 0),
        "Phosphorus": round(random.uniform(10, 60), 0),
        "Potassium": round(random.uniform(150, 300), 0),
        "pH": round(random.uniform(5.5, 7.5), 2),
        "Humidity": round(random.uniform(60, 90), 1),
        "source": "simulation"
    }
    time.sleep(0.2)
    return data
