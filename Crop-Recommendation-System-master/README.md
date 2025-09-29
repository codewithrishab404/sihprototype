# Crop Recommendation System

This project is a web-based crop recommendation system that uses machine learning to suggest suitable crops based on environmental factors such as soil type, temperature, humidity, moisture, and nutrient levels (Nitrogen, Potassium, Phosphorous).

## Project Structure

### Root Files
- **app.py**: Main Flask application file that handles routing, form processing, weather API integration, and serves the web interface.
- **requirements.txt**: Lists all Python dependencies required for the project, including Flask, scikit-learn, pandas, numpy, joblib, opencv-python, and requests.
- **README.md**: This documentation file explaining the project structure, installation, and usage.
- **SoilmoistureAnalysis.zip**: Archive containing additional resources or backups related to soil moisture analysis.
- **TODO.md**: Task list for project development and features.

### data/
- **Purpose**: Stores datasets used for training and testing the ML model.
- **SoilvsCrop/data_core.csv**: Main dataset containing crop data with features like Temperature, Humidity, Moisture, Soil Type, and labels for Crop Type, Nitrogen, Potassium, Phosphorous, Fertilizer Name. Used for training the recommendation models.

### models/
- **Purpose**: Stores serialized trained machine learning models and encoders.
- **crop_encoder.pkl**: Label encoder for crop types, used to transform categorical crop labels to numerical values.
- **crop_model.pkl**: Trained classifier model for predicting crop types based on environmental inputs.
- **crop_to_fert.pkl**: Model or mapping for fertilizer recommendations based on crop predictions.
- **fertilizer_encoder.pkl**: Label encoder for fertilizer types.
- **fertilizer_model.pkl**: Trained model for predicting fertilizer recommendations.
- **soil_encoder.pkl**: Label encoder for soil types, converting categorical soil data to numerical format.

### src/
- **Purpose**: Contains source code for model training and utility functions.
- **singly_linked_list.py**: Implementation of a singly linked list data structure for educational purposes or potential use in managing dynamic lists (e.g., recommendation queues).
- **train_model.py**: Script for training the ML models using the dataset, including data preprocessing, model fitting, and serialization.


### templates/
- **Purpose**: Contains Jinja2 HTML templates for the web interface.
- **index.html**: Main template with forms for user input (location, soil parameters) and displays for crop recommendations and soil moisture analysis.

### SoilmoistureAnalysis/
- **Purpose**: Module for soil moisture estimation from images.
- **Read this document.pdf**: Primary PDF guide for implementing soil moisture estimation using image processing.
- **soil_analyzer.py**: Python module with functions to analyze soil images and estimate moisture content using pixel intensity analysis.
- **data/Soilmoisture/**: Sample soil images (1.jpg, 2.jpg, 3.jpeg, 4.jpg) for testing the moisture analysis functionality.
## About __pycache__

The `__pycache__` directory is automatically created by Python when modules are imported. It contains compiled bytecode files (.pyc) that allow Python to load and execute code faster on subsequent runs by avoiding recompilation of unchanged source files. This is a standard Python optimization and can be safely ignored or deleted if needed (it will be regenerated). It is not part of the project source code and should not be committed to version control.




## Approach Overview

- **ML Model**: Employs an ensemble of machine learning algorithms for improved accuracy in crop and fertilizer recommendations. The system uses XGBoost, RandomForest, and SVM classifiers combined in a soft-voting ensemble (VotingClassifier from scikit-learn) for both crop type prediction and fertilizer recommendation. Data preprocessing involves encoding categorical variables (e.g., soil type) using LabelEncoder. The model predicts the top 3 most suitable crops with confidence probabilities and recommends an appropriate fertilizer based on environmental inputs. Frameworks used include scikit-learn for ensemble and traditional ML, XGBoost for gradient boosting, pandas for data manipulation, and joblib for model serialization.
- **Web App**: Flask handles routing, form processing, and rendering. User inputs are passed to the models for prediction, and results are displayed with top crop recommendations and fertilizer suggestion.
- **Data Structure**: Singly linked list is included as an educational component or for potential use in queues/stacks for recommendations.



## Installation and Usage

1. Set up virtual environment: `python -m venv venv`
2. Activate: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (macOS/Linux)
3. Install dependencies: `pip install -r requirements.txt`
4. Run training: `python src/train_model.py`
5. Run app: `python app.py`
6. Open browser to localhost:5000

Note: Always activate the virtual environment before running Python scripts to avoid module errors.



## Purpose of Singly Linked List

In this project, the singly linked list serves as a demonstration of fundamental data structures. It can be useful for scenarios requiring dynamic memory allocation and efficient insertions/deletions, such as maintaining a list of recent recommendations or user query history. Unlike Python's built-in lists, it avoids resizing overhead and allows O(1) prepend operations, which could be beneficial for certain application logic.

