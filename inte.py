from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from xgboost import XGBRegressor
import math
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Global variables to store models and encoders/scalers
rf_model = None
xgb_model = None
label_encoder = None
scaler = None
scaler2 = None

def strip_whitespace(df):
    for col in df.select_dtypes(include=['object']).columns:
        df[col] = df[col].str.strip()
    return df

def preprocess_data(df):
    df = strip_whitespace(df)
    df['Created'] = pd.to_datetime(df['Month'])
    df['Month'] = df['Created'].dt.to_period('M')
    df['Year'] = df['Month'].dt.year
    df['Month_Num'] = df['Month'].dt.month
    return df

@app.route('/train', methods=['POST'])
def train_model():
    global rf_model, xgb_model, label_encoder, scaler, scaler2

    # Load and preprocess training data
    train_data = request.files['file']
    df = pd.read_excel(train_data)
    df = preprocess_data(df)
    
    start_year = df['Year'][0]
    df["month_count"] = (df["Year"] - start_year) * 12 + df["Month_Num"] - 6
    
    label_encoder = LabelEncoder()
    df['Item'] = label_encoder.fit_transform(df['Item'])
    scaler = StandardScaler()
    scaler2 = StandardScaler()
    df[['Item', 'Month_Num']] = scaler.fit_transform(df[['Item', 'Month_Num']])
    df['Count'] = scaler2.fit_transform(df[['Count']])
    
    X_train = df[['Item', 'Month_Num']]
    y_train = df['Count']
    
    # Train Random Forest model
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    
    # Train XGBoost model
    xgb_model = XGBRegressor(n_estimators=100, random_state=42)
    xgb_model.fit(X_train, y_train)
    
    if rf_model is None or xgb_model is None or label_encoder is None or scaler is None or scaler2 is None:
        return jsonify({"error": "Models are not trained yet. Please train the models first."}), 400

    # Load and preprocess test data
    # test_data = request.files['file']
    df1 = pd.read_excel('test_data.xlsx')
    df1 = preprocess_data(df1)
    df1['Item'] = label_encoder.transform(df1['Item'])
    df1[['Item', 'Month_Num']] = scaler.transform(df1[['Item', 'Month_Num']])
    
    X_test = df1[['Item', 'Month_Num']]
    
    # Make predictions
    y_pred_rf = rf_model.predict(X_test)
    y_pred_xgb = xgb_model.predict(X_test)
    
    # Inverse transform and round predictions
    y_pred_rf = scaler2.inverse_transform(y_pred_rf.reshape(-1, 1))
    y_pred_xgb = scaler2.inverse_transform(y_pred_xgb.reshape(-1, 1))
    y_pred_rf = [math.ceil(y) for y in y_pred_rf]
    y_pred_xgb = [math.ceil(y) for y in y_pred_xgb]
    
    # Prepare response
    df1['result_rand'] = y_pred_rf
    df1['result_xg'] = y_pred_xgb
    
    df1[['Item', 'Month_Num']] = scaler.inverse_transform(df1[['Item', 'Month_Num']])

    df1.Item = df1.Item.astype(int)
    df1['Item'] = label_encoder.inverse_transform(df1['Item'])
    result = df1[['Item', 'Month_Num', 'Year', 'result_rand', 'result_xg']].to_dict(orient='records')
    return jsonify(result)
    

if __name__ == '__main__':
    app.run(debug=True)