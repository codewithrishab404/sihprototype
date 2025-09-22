import { Phone, Mail, MessageCircle } from 'lucide-react';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Support &amp; Help</h1>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Get instant help from our experts</p>
            <p className="font-medium text-green-600">+91-9876543210</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us your queries anytime</p>
            <p className="font-medium text-green-600">support@agribrain.com</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with us in real-time</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Start Chat
            </button>
          </div>
        </div>

        {/* Government Support */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Government Agricultural Support</h2>
          <p className="text-gray-700 mb-2">
            For official agricultural assistance, subsidies, and crop guidance, contact the government helpline:
          </p>
          <p className="font-medium text-green-600">Toll-free: 1800-180-1551</p>
          <p className="text-gray-500 text-sm mt-1">Available Monday to Saturday, 9:00 AM – 6:00 PM</p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How accurate are the crop recommendations?</h3>
              <p className="text-gray-600">Our AI-powered system has a 95% accuracy rate, analyzing climate, soil, market trends, and historical data.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Can I use this system for organic farming?</h3>
              <p className="text-gray-600">Yes! Our system includes organic farming recommendations and alternatives for conventional crops.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How often is the weather data updated?</h3>
              <p className="text-gray-600">Weather data is updated every hour, and soil data is refreshed daily for the most current information.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Is there a mobile app available?</h3>
              <p className="text-gray-600">Currently, we offer a responsive web application. A mobile app is in development.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Do you provide ongoing crop monitoring?</h3>
              <p className="text-gray-600">Yes, we offer continuous monitoring with alerts for optimal planting, watering, and harvesting times.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
