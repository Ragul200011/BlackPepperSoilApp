# ai_model.py
# ------------------------------
# AI Model wrapper for predictions

import os
import joblib
import numpy as np
from collections import Counter

MODEL_DIR = "model_results_smote"
RF_PATH = os.path.join(MODEL_DIR, "Random Forest_model.pkl")
XGB_PATH = os.path.join(MODEL_DIR, "XGBoost_model.pkl")
SVM_PATH = os.path.join(MODEL_DIR, "SVM_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.pkl")

class SoilAI:
    def __init__(self):
        try:
            self.rf = joblib.load(RF_PATH)
            self.xgb = joblib.load(XGB_PATH)
            self.svm = joblib.load(SVM_PATH)
            self.scaler = joblib.load(SCALER_PATH)
            self.encoder = joblib.load(ENCODER_PATH)
        except Exception as e:
            print(f"AI Model Load Error: {e}")
            self.rf = self.xgb = self.svm = self.scaler = self.encoder = None

    def predict(self, sensor_dict):
        """Returns predictions from all models and consensus"""
        if not self.rf:
            return {"RF":"N/A","XGB":"N/A","SVM":"N/A","Consensus":"N/A"}

        X = np.array([[sensor_dict['Temperature'],
                       sensor_dict['Moisture'],
                       sensor_dict['Nitrogen'],
                       sensor_dict['Phosphorus'],
                       sensor_dict['Potassium'],
                       sensor_dict['pH']]])
        X_scaled = self.scaler.transform(X)
        rf_pred = self.encoder.inverse_transform([self.rf.predict(X_scaled)[0]])[0]
        xgb_pred = self.encoder.inverse_transform([self.xgb.predict(X_scaled)[0]])[0]
        svm_pred = self.encoder.inverse_transform([self.svm.predict(X_scaled)[0]])[0]
        consensus = Counter([rf_pred, xgb_pred, svm_pred]).most_common(1)[0][0]

        return {"RF":rf_pred,"XGB":xgb_pred,"SVM":svm_pred,"Consensus":consensus}
