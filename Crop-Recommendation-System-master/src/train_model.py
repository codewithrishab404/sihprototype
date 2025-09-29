import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.svm import SVC
import xgboost as xgb
import joblib
import os

# Load data
data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'SoilvsCrop', 'data_core.csv')
df = pd.read_csv(data_path)

# Preprocess
le_soil = LabelEncoder()
df['Soil Type'] = le_soil.fit_transform(df['Soil Type'])

# Features
features = ['Temparature', 'Humidity', 'Moisture', 'Soil Type', 'Nitrogen', 'Potassium', 'Phosphorous']
X = df[features]

# Target for crop
y_crop = df['Crop Type']
le_crop = LabelEncoder()
y_crop_encoded = le_crop.fit_transform(y_crop)

# Target for fertilizer
y_fert = df['Fertilizer Name']
le_fert = LabelEncoder()
y_fert_encoded = le_fert.fit_transform(y_fert)

# Split
X_train, X_test, y_crop_train, y_crop_test, y_fert_train, y_fert_test = train_test_split(
    X, y_crop_encoded, y_fert_encoded, test_size=0.2, random_state=42)

# Models for crop
xgb_model = xgb.XGBClassifier(objective='multi:softmax', num_class=len(le_crop.classes_), random_state=42)
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
svm_model = SVC(probability=True, random_state=42)

# Ensemble for crop
crop_ensemble = VotingClassifier(estimators=[
    ('xgb', xgb_model),
    ('rf', rf_model),
    ('svm', svm_model)
], voting='soft')

crop_ensemble.fit(X_train, y_crop_train)

# Evaluate crop
y_crop_pred = crop_ensemble.predict(X_test)
crop_accuracy = accuracy_score(y_crop_test, y_crop_pred)
print(f'Crop Model Accuracy: {crop_accuracy:.2f}')

# Models for fertilizer
xgb_fert = xgb.XGBClassifier(objective='multi:softmax', num_class=len(le_fert.classes_), random_state=42)
rf_fert = RandomForestClassifier(n_estimators=100, random_state=42)
svm_fert = SVC(probability=True, random_state=42)

fert_ensemble = VotingClassifier(estimators=[
    ('xgb', xgb_fert),
    ('rf', rf_fert),
    ('svm', svm_fert)
], voting='soft')

fert_ensemble.fit(X_train, y_fert_train)

# Evaluate fertilizer
y_fert_pred = fert_ensemble.predict(X_test)
fert_accuracy = accuracy_score(y_fert_test, y_fert_pred)
print(f'Fertilizer Model Accuracy: {fert_accuracy:.2f}')

# Create crop to fertilizer mapping
from collections import Counter
crop_to_fert = {}
for crop in df['Crop Type'].unique():
    ferts = df[df['Crop Type'] == crop]['Fertilizer Name']
    most_common = Counter(ferts).most_common(1)[0][0]
    crop_to_fert[crop] = most_common

# Save models and encoders
models_dir = os.path.join(os.path.dirname(__file__), '..', 'models')
os.makedirs(models_dir, exist_ok=True)
joblib.dump(crop_ensemble, os.path.join(models_dir, 'crop_model.pkl'))
joblib.dump(fert_ensemble, os.path.join(models_dir, 'fertilizer_model.pkl'))
joblib.dump(le_soil, os.path.join(models_dir, 'soil_encoder.pkl'))
joblib.dump(le_crop, os.path.join(models_dir, 'crop_encoder.pkl'))
joblib.dump(le_fert, os.path.join(models_dir, 'fertilizer_encoder.pkl'))
joblib.dump(crop_to_fert, os.path.join(models_dir, 'crop_to_fert.pkl'))

print('Models and encoders saved.')
