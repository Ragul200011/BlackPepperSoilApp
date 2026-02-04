# 🌱 Black Pepper Soil Health Monitoring & Fertilizer Recommendation System using IoT & AI

[![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/) 
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) 
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![ESP32](https://img.shields.io/badge/ESP32-0F9D58?style=for-the-badge&logo=arduino&logoColor=white)](https://www.espressif.com/en/products/socs/esp32)

---

## 🌟 Overview
This project is a **soil health monitoring and fertilizer recommendation system** for **small-scale black pepper farmers in Sri Lanka**, especially those in rural areas with limited internet access.  
It combines **IoT sensors**, a **mobile app**, and **AI/ML models** to provide:  

- Real-time soil data  
- Soil health scores  
- Crop-specific fertilizer recommendations  

---

## 🎯 Target Users
- Small-scale black pepper farmers  
- Farmers with limited technical knowledge or internet connectivity  

---

## 📱 Key Mobile Application Features

### 1️⃣ Real-Time Soil Data Monitoring
- Collects data from IoT soil sensors:
  - 🟢 Nitrogen (N), Phosphorus (P), Potassium (K)  
  - 🟢 Soil pH, moisture, temperature  
  - 🌍 GPS location of the pepper field
- **Color-coded cards** for easy visualization:
  - 🟢 Green = Good  
  - 🟡 Yellow = Moderate  
  - 🔴 Red = Critical  

### 2️⃣ Soil Health Score (0–100)
- Single numeric score for soil condition  
- Categories:
  - 🟢 80–100 → Healthy soil  
  - 🟡 60–79 → Moderate  
  - 🔴 Below 60 → Needs attention  

### 3️⃣ Fertilizer Recommendations (AI/ML)
- Predicts nutrient depletion  
- Suggests fertilizer type, quantity & timing  
- Example:  
> “Apply 120g Urea + 90g MOP per vine during vegetative stage.”  

### 4️⃣ Pre-Planting & Post-Planting Monitoring
- 🌱 **Pre-planting:** Checks soil suitability & suggests corrections  
- 🌿 **Post-planting:** Monitors growth stages:
  - Establishment  
  - Vegetative  
  - Flowering  
  - Berry development  

### 5️⃣ Offline-First Capability
- Works **without internet**  
- Stores soil data locally and syncs automatically when online  

### 6️⃣ Historical Data & Trends
- View soil health trends & nutrient patterns  
- Displayed as 📈 line charts and 📊 bar charts  

### 7️⃣ Multilingual & Farmer-Friendly UI
- Supports **Tamil / Sinhala / English**  
- Minimal text, clear icons, and color indicators  

---

## 🖥 Screen-Wise UI Flow

<details>
<summary>Click to Expand Screens</summary>

### 🏠 Home Screen (Dashboard)
- Shows soil health score, current status, connectivity, last synced  
- Buttons: View Soil Data, Get Recommendations, View History  

### 🌡 Sensor Data Screen
- Displays N, P, K, pH, moisture, temperature, GPS  
- Color-coded cards for each parameter  

### 📋 Recommendations Screen
- Fertilizer recommendations per vine/hectare  
- Suggests suitable black pepper variety  

### 📊 History & Trends Screen
- Date-wise soil data, soil health trends, nutrient usage  
- Line & bar charts  

### ⚙️ Settings Screen
- Language selection  
- Sync settings  
- Growth stage selection  
- IoT sensor pairing  

</details>

---

## 🏗 System Architecture

<details>
<summary>Click to Expand Architecture</summary>

### High-Level Architecture

IoT Sensors → Mobile App → Backend Server → AI/ML Engine → Mobile App


### IoT Layer
- ESP32 + sensors (NPK, pH, Moisture, Temperature)  
- Sends data via Bluetooth (offline) or Wi-Fi (online)  

### Mobile App Layer
- React Native mobile app  
- Data collection, visualization, offline storage  

### Backend Layer
- Node.js / Express REST API  
- Data storage, user auth, AI inference requests  

### AI/ML Engine
- Predicts nutrient depletion & fertilizer recommendation  
- Models: Random Forest, XGBoost  
- Deployment: TensorFlow Lite / ONNX  

### Database
- Local offline: SQLite  
- Cloud: Firebase Firestore / MongoDB  

</details>

---

## 💻 Technology Stack

| Layer | Component | Technology |
|-------|-----------|-----------|
| **Frontend** | Mobile UI | React Native |
|  | Charts | Victory Charts / Recharts |
|  | Offline Storage | AsyncStorage / SQLite |
|  | Language Support | i18n |
| **IoT Hardware** | Microcontroller | ESP32 |
|  | Sensors | NPK, pH, Moisture, DHT11 |
|  | Communication | BLE |
| **Backend** | Server | Node.js / Express |
|  | Hosting | Firebase / AWS Free Tier |
| **Database** | Local | SQLite |
|  | Cloud | Firebase Firestore / MongoDB |
| **AI / ML** | Model Training | Python (Scikit-learn) |
|  | Models | Random Forest, XGBoost |
|  | Deployment | TensorFlow Lite / ONNX |

---

## 🔄 Simple Workflow
1. 🌱 Sensors collect soil data  
2. ⚡ ESP32 sends data to mobile app  
3. 📱 App stores data locally (offline support)  
4. 🌐 Data syncs to backend when online  
5. 🤖 AI model analyzes soil & growth stage  
6. 💡 Fertilizer recommendations are generated  
7. 📊 Results displayed in farmer-friendly format  

---

## 👤 Author
**Ragul Krishna** – Final Year IT Student (IoT & AI Integration)

---

## 📝 License
MIT License
