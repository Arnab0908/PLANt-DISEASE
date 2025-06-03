from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import random

app = Flask(__name__)
CORS(app)

# Create uploads directory if it doesn't exist
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return "Flask backend for Plant Disease Detector is running!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    # Save the uploaded image
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    # Dummy prediction (replace with ML model logic later)
    prediction = random.choice(['Healthy', 'Diseased'])

    return jsonify({'result': prediction})

if __name__ == '_main_':
    app.run(host='0.0.0.0', port=5000)