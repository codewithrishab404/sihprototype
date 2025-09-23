import { Sun, Thermometer, Droplets, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherPage = () => {
  const currentWeather = {
    temperature: 28,
    humidity: 75,
    rainfall: 145,
    windSpeed: 12,
  };

  const soilAnalysis = {
    pH: 6.5,
    nitrogen: 'Medium',
    phosphorus: 'High',
    potassium: 'Medium',
  };

  const forecast = [
    { day: 'Mon', high: 30, low: 20, weatherType: 'sun' },
    { day: 'Tue', high: 31, low: 21, weatherType: 'sun' },
    { day: 'Wed', high: 32, low: 22, weatherType: 'rain' },
    { day: 'Thu', high: 30, low: 21, weatherType: 'sun' },
    { day: 'Fri', high: 29, low: 19, weatherType: 'rain' },
    { day: 'Sat', high: 28, low: 18, weatherType: 'sun' },
    { day: 'Sun', high: 27, low: 17, weatherType: 'rain' },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          'url("https://plus.unsplash.com/premium_photo-1664301324141-c7f0229ca1bb?w=1200&auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-green-800 text-center">Weather & Soil Insights</h1>

        {/* Current Weather & Soil */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Weather */}
          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Sun className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold">Current Weather</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-800">Temperature:</span>
                <span className="font-medium">{currentWeather.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Humidity:</span>
                <span className="font-medium">{currentWeather.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Rainfall (This Month):</span>
                <span className="font-medium">{currentWeather.rainfall}mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Wind Speed:</span>
                <span className="font-medium">{currentWeather.windSpeed} km/h</span>
              </div>
            </div>
          </div>

          {/* Soil Analysis */}
          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Thermometer className="w-6 h-6 text-red-500 mr-2" />
              </motion.div>
              <h2 className="text-xl font-semibold">Soil Analysis</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-800">pH Level:</span>
                <span className="font-medium">{soilAnalysis.pH} (Optimal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Nitrogen:</span>
                <span className="font-medium">{soilAnalysis.nitrogen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Phosphorus:</span>
                <span className="font-medium">{soilAnalysis.phosphorus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Potassium:</span>
                <span className="font-medium">{soilAnalysis.potassium}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Droplets className="w-6 h-6 text-blue-500 mr-2" />
            7-Day Forecast
          </h2>
          <div className="grid grid-cols-7 gap-4 text-center">
            {forecast.map((day) => (
              <div key={day.day} className="text-center">
                <div className="font-medium text-gray-800 mb-2">{day.day}</div>
                <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                  {day.weatherType === 'sun' ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }} // gently expands and shrinks
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center justify-center"
                    >
                      <Sun className="w-8 h-8 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <CloudRain className="w-8 h-8 text-blue-500" />
                    </motion.div>
                  )}

                </div>
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
