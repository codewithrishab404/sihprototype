import { useState } from 'react';

const cropDatabase = {
  mumbai: {
    climate: 'Tropical',
    rainfall: '2400mm',
    temperature: '27°C',
    crops: [
      { name: 'Rice', suitability: 95, season: 'Kharif', profit: 'High', water: 'High' },
      { name: 'Sugarcane', suitability: 90, season: 'Year-round', profit: 'Very High', water: 'High' },
      { name: 'Cotton', suitability: 75, season: 'Kharif', profit: 'Medium', water: 'Medium' },
      { name: 'Vegetables', suitability: 85, season: 'All seasons', profit: 'High', water: 'Medium' }
    ]
  },
  delhi: {
    climate: 'Semi-arid',
    rainfall: '790mm',
    temperature: '23°C',
    crops: [
      { name: 'Wheat', suitability: 95, season: 'Rabi', profit: 'High', water: 'Medium' },
      { name: 'Mustard', suitability: 85, season: 'Rabi', profit: 'Medium', water: 'Low' },
      { name: 'Barley', suitability: 80, season: 'Rabi', profit: 'Medium', water: 'Low' },
      { name: 'Vegetables', suitability: 90, season: 'All seasons', profit: 'High', water: 'Medium' }
    ]
  }
};

const RecommendationPage = () => {
  const [locationInput, setLocationInput] = useState('');
  const [soilType, setSoilType] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const generateRecommendations = () => {
    const location = locationInput.toLowerCase();
    const data = cropDatabase[location] || cropDatabase['mumbai']; // default to Mumbai
    setRecommendations(data.crops.slice(0, 3));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Crop Recommendations</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Enter Your Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter your city (e.g., Mumbai, Delhi)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
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
            <div className="flex items-end">
              <button
                onClick={generateRecommendations}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Get Recommendations
              </button>
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800">Recommended Crops</h2>
            {recommendations.map((crop, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{crop.name}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {crop.suitability}% Match
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Season:</span> {crop.season}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Profit Potential:</span> {crop.profit}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Water Requirement:</span> {crop.water}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;
