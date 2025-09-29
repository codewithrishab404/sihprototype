from flask import Flask, request, render_template, jsonify
import joblib
import os
import numpy as np
import requests
import cv2
from werkzeug.utils import secure_filename
from SoilmoistureAnalysis.soil_analyzer import estimate_soil_moisture

app = Flask(__name__)

# Configure upload folder for images
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Load models and encoders
models_dir = os.path.join(os.path.dirname(__file__), 'models')
crop_model = joblib.load(os.path.join(models_dir, 'crop_model.pkl'))
fert_model = joblib.load(os.path.join(models_dir, 'fertilizer_model.pkl'))
soil_encoder = joblib.load(os.path.join(models_dir, 'soil_encoder.pkl'))
crop_encoder = joblib.load(os.path.join(models_dir, 'crop_encoder.pkl'))
fert_encoder = joblib.load(os.path.join(models_dir, 'fertilizer_encoder.pkl'))
crop_to_fert = joblib.load(os.path.join(models_dir, 'crop_to_fert.pkl'))

API_KEY = '967ff87e76bf44afbbb1031e77264b3e'  # Weatherbit API key

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_weather', methods=['GET'])
def get_weather():
    location = request.args.get('location')
    if not location:
        return jsonify({'error': 'Location is required'}), 400

    # Fetch weather data using Weatherbit API
    weather_url = f"https://api.weatherbit.io/v2.0/current?key={API_KEY}&city={location}&country=IN"
    weather_response = requests.get(weather_url)
    if weather_response.status_code != 200:
        return jsonify({'error': f'API request failed with status {weather_response.status_code}'}), 500

    weather_data = weather_response.json()
    if 'error' in weather_data:
        return jsonify({'error': weather_data['error']}), 400

    if not weather_data.get('data'):
        return jsonify({'error': 'No data available'}), 400

    data = weather_data['data'][0]
    temperature = data['temp']
    humidity = data['rh']

    return jsonify({'temperature': temperature, 'humidity': humidity})


@app.route('/predict', methods=['POST'])
def predict():
    # Get form data
    temperature = float(request.form['temperature'])
    humidity = float(request.form['humidity'])
    moisture = float(request.form['moisture'])
    soil_type = request.form['soil_type']
    nitrogen = float(request.form['nitrogen'])
    potassium = float(request.form['potassium'])
    phosphorous = float(request.form['phosphorous'])

    # Encode soil_type
    soil_encoded = soil_encoder.transform([soil_type])[0]

    # Prepare input
    input_data = [[temperature, humidity, moisture, soil_encoded, nitrogen, potassium, phosphorous]]

    # Predict top 3 crops
    crop_probs = crop_model.predict_proba(input_data)[0]
    top_indices = np.argsort(crop_probs)[-3:][::-1]  # Top 3 descending
    top_crops = crop_encoder.inverse_transform(top_indices)
    top_probs = crop_probs[top_indices]

    recommendations = []
    for crop, prob in zip(top_crops, top_probs):
        fert = crop_to_fert.get(crop, 'Unknown')
        recommendations.append((crop, prob, fert))

    return render_template('index.html', recommendations=recommendations)

@app.route('/analyze_soil', methods=['POST'])
def analyze_soil():
    if 'soil_image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['soil_image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            moisture = estimate_soil_moisture(filepath)
            # Clean up the uploaded file
            os.remove(filepath)
            return jsonify({'moisture': moisture})
        except Exception as e:
            # Clean up on error
            if os.path.exists(filepath):
                os.remove(filepath)
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
