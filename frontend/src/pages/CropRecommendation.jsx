import { useState } from "react";

const CropRecommendation = () => {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [soilType, setSoilType] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [potassium, setPotassium] = useState("");
  const [phosphorous, setPhosphorous] = useState("");
  const [soilImage, setSoilImage] = useState(null);

  const [moistureResult, setMoistureResult] = useState(null);
  const [moistureError, setMoistureError] = useState(null);

  const [recommendations, setRecommendations] = useState([]);

  // Fetch weather automatically when location changes
  const fetchWeather = async (loc) => {
    try {
      const response = await fetch(`/get_weather?location=${encodeURIComponent(loc)}`);
      const data = await response.json();
      if (response.ok) {
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      } else {
        setTemperature("");
        setHumidity("");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setTemperature("");
      setHumidity("");
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.trim()) {
      fetchWeather(value.trim());
    } else {
      setTemperature("");
      setHumidity("");
    }
  };

  // Soil image upload
  const handleSoilSubmit = async (e) => {
    e.preventDefault();
    if (!soilImage) return;

    const formData = new FormData();
    formData.append("soil_image", soilImage);

    setMoistureResult(null);
    setMoistureError(null);

    try {
      const response = await fetch("/analyze_soil", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMoistureResult(data.moisture);
      } else {
        setMoistureError(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error analyzing soil:", error);
      setMoistureError("Failed to analyze image");
    }
  };

  // Main crop prediction form
  const handlePredict = async (e) => {
    e.preventDefault();
    const formData = {
      location,
      temperature,
      humidity,
      moisture,
      soil_type: soilType,
      nitrogen,
      potassium,
      phosphorous,
    };

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setRecommendations(data.recommendations || []);
      } else {
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Error predicting crops:", error);
      setRecommendations([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white text-center drop-shadow-md mb-2">
        Crop Recommendation System
      </h1>
      <p className="text-white mb-6 text-center">
        Enter the environmental and soil data to get crop recommendations.
      </p>

      {/* Prediction Form */}
      <form
        onSubmit={handlePredict}
        className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-4"
      >
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Location (City)
          </label>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter city name"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Temperature (°C)
          </label>
          <input
            type="number"
            step="0.1"
            value={temperature}
            readOnly
            required
            className="w-full p-3 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Humidity (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={humidity}
            readOnly
            required
            className="w-full p-3 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Moisture (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={moisture}
            onChange={(e) => setMoisture(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Soil Type
          </label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Soil Type</option>
            <option value="Sandy">Sandy</option>
            <option value="Loamy">Loamy</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
            <option value="Clayey">Clayey</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Nitrogen (kg/ha)
          </label>
          <input
            type="number"
            value={nitrogen}
            onChange={(e) => setNitrogen(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Potassium (kg/ha)
          </label>
          <input
            type="number"
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Phosphorous (kg/ha)
          </label>
          <input
            type="number"
            value={phosphorous}
            onChange={(e) => setPhosphorous(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition"
        >
          Predict Crop
        </button>
      </form>

      {/* Soil Moisture Analysis */}
      <div className="mt-10 bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-xl">
        <h2 className="text-xl font-bold text-blue-600 text-center mb-2">
          Soil Moisture Analysis
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Upload a soil image to estimate moisture content.
        </p>

        <form onSubmit={handleSoilSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSoilImage(e.target.files[0])}
            required
            className="w-full border rounded-lg p-2"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition"
          >
            Analyze Moisture
          </button>
        </form>

        {moistureResult && (
          <div className="mt-4 text-center">
            <h3 className="text-blue-600 font-semibold">
              Estimated Moisture: {moistureResult}%
            </h3>
          </div>
        )}
        {moistureError && (
          <div className="mt-4 text-center text-red-500">{moistureError}</div>
        )}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="prediction bg-white/95 p-8 rounded-2xl shadow-xl w-full max-w-xl mt-10">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
            Recommended Crops and Fertilizers
          </h2>
          <ul className="space-y-3">
            {recommendations.map(([crop, prob, fert], idx) => (
              <li
                key={idx}
                className="bg-gray-50 p-3 rounded-lg border-l-4 border-green-500"
              >
                {crop} ({(prob * 100).toFixed(2)}% confidence) || Fertilizer:{" "}
                {fert}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;
