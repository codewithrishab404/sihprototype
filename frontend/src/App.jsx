import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CropRecommendation from './pages/CropRecommendation';
import WeatherPage from './pages/WeatherPage';
import SupportPage from './pages/SupportPage';

const App = () => {
  return (
    
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommendations" element={<CropRecommendation />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </div>
    
  );
};

export default App;
