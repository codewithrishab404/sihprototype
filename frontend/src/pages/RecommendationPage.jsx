import { useState } from "react";

const RecommendationPage = () => {
  const [locationInput, setLocationInput] = useState("");
  const [soilType, setSoilType] = useState("");
  const [budget, setBudget] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = async () => {
    if (!locationInput || !soilType || !budget) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/getresponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `I am a farmer in ${locationInput}, with ${soilType} soil and ${budget} budget. Recommend crops suitable for me in simple Hindi + English.`,
        }),
      });

      const data = await response.json();
      setRecommendations([data.response]); //  plain text from Gemini
    } catch (error) {
      console.error("Error fetching AI recommendation:", error);
      alert("Failed to fetch recommendation. Try again!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-10 text-center">
          Crop Recommendations
        </h1>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-green-800">
            Enter Your Details
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter city (e.g., Mumbai)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select soil type</option>
                <option value="clay">Clay</option>
                <option value="loam">Loam</option>
                <option value="sandy">Sandy</option>
                <option value="silt">Silt</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                <option value="low">Low (&lt; ₹50,000)</option>
                <option value="medium">Medium (₹50,000 - ₹2,00,000)</option>
                <option value="high">High (&gt; ₹2,00,000)</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={generateRecommendations}
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold transition"
            >
              {loading ? "Generating..." : "Get Recommendations"}
            </button>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-green-800">
              Recommended Crops
            </h2>
            {recommendations.map((crop, idx) => (
              <div
                key={idx}
                className="bg-green-50 p-5 rounded-lg border border-green-200"
              >
                <p className="text-green-800 font-medium">{crop}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;
