# app.py
# ------------------------------
# Streamlit Dashboard
import streamlit as st
import time
from collections import Counter
from sensor_interface import get_sensor_data
from ai_model import SoilAI
import plotly.graph_objects as go

# Load AI models
ai = SoilAI()

# Streamlit page setup
st.set_page_config(page_title="🌿 Black Pepper Guardian", layout="wide")
st.title("🌿 Smart Black Pepper Guardian")
st.sidebar.title("🎮 Controls")

# Operation Mode
mode = st.sidebar.radio("Operation Mode", ["Simulation Mode", "Live Sensor Mode", "ThingSpeak Cloud"])

# Auto-refresh settings
auto_refresh = st.sidebar.checkbox("Auto-Refresh Dashboard", value=True)
interval = st.sidebar.number_input("Refresh Interval (seconds)", 1, 10, 1)

# Placeholder container for metrics and graphs
placeholder = st.empty()
if 'history' not in st.session_state:
    st.session_state.history = {'Nitrogen': [], 'Phosphorus': [], 'pH': [], 'time': []}

def run_cycle():
    # Get sensor data
    data = get_sensor_data(mode=mode)
    if not data:
        st.warning("Sensor not ready")
        return

    # Show metrics
    cols = st.columns(7)
    metrics = [("Temperature", f"{data.get('Temperature',0)} °C"),
               ("Moisture", f"{data.get('Moisture',0)} %"),
               ("Nitrogen", f"{data.get('Nitrogen',0)} mg/kg"),
               ("Phosphorus", f"{data.get('Phosphorus',0)} mg/kg"),
               ("Potassium", f"{data.get('Potassium',0)} mg/kg"),
               ("pH", f"{data.get('pH',0)}"),
               ("Humidity", f"{data.get('Humidity',0)} %")]
    for col, (label,val) in zip(cols, metrics):
        col.metric(label,val)

    # AI Predictions
    sensor_for_ai = {
        "Temperature": data.get("Temperature",0),
        "Moisture": data.get("Moisture",0),
        "Nitrogen": data.get("Nitrogen",0),
        "Phosphorus": data.get("Phosphorus",0),
        "Potassium": data.get("Potassium",0),
        "pH": data.get("pH",0)
    }
    preds = ai.predict(sensor_for_ai)

    # Show AI verdict
    st.markdown("---")
    st.subheader("🤖 AI Council Verdict")
    c1,c2,c3,c4 = st.columns(4)
    c1.info(preds["RF"]); c2.info(preds["XGB"]); c3.info(preds["SVM"])
    consensus = preds["Consensus"]
    if consensus.lower()=="healthy":
        c4.success(f"FINAL CONSENSUS\n{consensus}")
    else:
        c4.error(f"FINAL CONSENSUS\n{consensus}")

    # Update history
    st.session_state.history['Nitrogen'].append(sensor_for_ai['Nitrogen'])
    st.session_state.history['Phosphorus'].append(sensor_for_ai['Phosphorus'])
    st.session_state.history['pH'].append(sensor_for_ai['pH'])
    st.session_state.history['time'].append(time.strftime("%H:%M:%S"))
    if len(st.session_state.history['time'])>30:
        for k in st.session_state.history: st.session_state.history[k].pop(0)

    # Live graph
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=st.session_state.history['time'], y=st.session_state.history['Nitrogen'], name='N', mode='lines+markers'))
    fig.add_trace(go.Scatter(x=st.session_state.history['time'], y=st.session_state.history['Phosphorus'], name='P', mode='lines+markers'))
    fig.add_trace(go.Scatter(x=st.session_state.history['time'], y=st.session_state.history['pH'], name='pH', mode='lines+markers', yaxis='y2'))
    fig.update_layout(title="📊 Soil Trends", xaxis_title="Time",
                      yaxis=dict(title="Nutrients (mg/kg)"),
                      yaxis2=dict(title="pH", overlaying='y', side='right'),
                      height=400)
    st.plotly_chart(fig, use_container_width=True)

# Main loop
if auto_refresh:
    while True:
        with placeholder.container():
            run_cycle()
        time.sleep(interval)
        st.rerun()

else:
    if st.button("📡 Read Sensors Once"):
        with placeholder.container():
            run_cycle()
