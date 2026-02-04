# config.py
# ------------------------------
# Project-wide configuration

# Simulation mode toggle
USE_SIMULATION = True  # True = simulated sensor, False = real hardware

# Serial / Modbus defaults
SERIAL_PORT = "COM3"
BAUDRATE = 9600
SENSOR_ID = 1
TIMEOUT = 1.0
FUNCTION_CODE = 3

# ThingSpeak defaults
TS_CHANNEL = "3187265"
TS_KEY = "ISFWVJXZW7P5TMQ9"
