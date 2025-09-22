import { Sun, Thermometer, Droplets } from 'lucide-react';

const WeatherPage = () => {
  // Demo data (replace with API data later)
  const currentWeather = {
    temperature: 28,
    humidity: 75,
    rainfall: 145,
    windSpeed: 12
  };

  const soilAnalysis = {
    pH: 6.5,
    nitrogen: 'Medium',
    phosphorus: 'High',
    potassium: 'Medium'
  };

  const forecast = [
    { day: 'Mon', high: 30, low: 20 },
    { day: 'Tue', high: 31, low: 21 },
    { day: 'Wed', high: 32, low: 22 },
    { day: 'Thu', high: 30, low: 21 },
    { day: 'Fri', high: 29, low: 19 },
    { day: 'Sat', high: 28, low: 18 },
    { day: 'Sun', high: 27, low: 17 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Weather &amp; Soil Insights</h1>

        {/* Current Weather & Soil */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Current Weather */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Sun className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold">Current Weather</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature:</span>
                <span className="font-medium">{currentWeather.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Humidity:</span>
                <span className="font-medium">{currentWeather.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rainfall (This Month):</span>
                <span className="font-medium">{currentWeather.rainfall}mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wind Speed:</span>
                <span className="font-medium">{currentWeather.windSpeed} km/h</span>
              </div>
            </div>
          </div>

          {/* Soil Analysis */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Thermometer className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">Soil Analysis</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">pH Level:</span>
                <span className="font-medium">{soilAnalysis.pH} (Optimal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nitrogen:</span>
                <span className="font-medium">{soilAnalysis.nitrogen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phosphorus:</span>
                <span className="font-medium">{soilAnalysis.phosphorus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Potassium:</span>
                <span className="font-medium">{soilAnalysis.potassium}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Droplets className="w-6 h-6 text-blue-500 mr-2" />
            7-Day Forecast
          </h2>
          <div className="grid grid-cols-7 gap-4 text-center">
            {forecast.map((day) => (
              <div key={day.day} className="text-center">
                <div className="font-medium text-gray-600 mb-2">{day.day}</div>
                <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm">
                  <div className="font-medium">{day.high}°C</div>
                  <div className="text-gray-500">{day.low}°C</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
