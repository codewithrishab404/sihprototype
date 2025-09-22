import { ArrowRight, MapPin, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-green-800 mb-6">
          Smart Crop Recommendation System
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Maximize your agricultural yield with AI-powered crop recommendations tailored to your local climate, soil conditions, and market demands.
        </p>
        <Link
          to="/recommendations"
          className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition flex items-center space-x-2 mx-auto"
        >
          <span>Get Recommendations</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Location-Based</h3>
          <p className="text-gray-600">Personalized recommendations based on your specific geographic location and local conditions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Profit Optimization</h3>
          <p className="text-gray-600">Maximize your returns with crops that offer the best market potential in your area.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Expert Insights</h3>
          <p className="text-gray-600">Access agricultural expertise and data-driven insights for informed decision making.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
            <div className="text-gray-600">Farmers Helped</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Crop Varieties</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
