import { ArrowRight, MapPin, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 to-green-100">
    {/* Animated Background */}
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(72,187,120,0.3), transparent 40%), radial-gradient(circle at 80% 80%, rgba(72,187,120,0.2), transparent 40%)",
        zIndex: 0,
      }}
    ></motion.div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 mb-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-6">
            Smart Crop Recommendation System
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
            Maximize your agricultural yield with AI-powered crop
            recommendations tailored to your local climate, soil conditions, and
            market demands.
          </p>
          <Link
            to="/recommendations"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition"
          >
            Get Recommendations
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </div>
        <div className="md:w-1/2">
          <motion.div
            className="w-full h-64 md:h-80 bg-green-200 rounded-xl flex items-center justify-center text-green-700 font-bold text-2xl shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Crop Illustration
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          {
            icon: <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />,
            title: "Location-Based",
            description:
              "Personalized recommendations based on your specific geographic location and local conditions.",
          },
          {
            icon: (
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            ),
            title: "Profit Optimization",
            description:
              "Maximize your returns with crops that offer the best market potential in your area.",
          },
          {
            icon: <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />,
            title: "Expert Insights",
            description:
              "Access agricultural expertise and data-driven insights for informed decision making.",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{
              y: -10,
              scale: 1.05,
              boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
            }}
            className="bg-white p-8 rounded-xl shadow-lg text-center transition"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-10 mb-20">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { value: "10,000+", label: "Farmers Helped" },
            { value: "500+", label: "Crop Varieties" },
            { value: "95%", label: "Success Rate" },
            { value: "24/7", label: "Support" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="transition"
            >
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="text-center mb-20">
        <h2 className="text-3xl font-bold text-green-800 mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              step: "1",
              title: "Input Your Details",
              desc: "Provide your soil type, location, and preferences.",
            },
            {
              step: "2",
              title: "AI Processing",
              desc: "Our system analyzes data to suggest optimal crops.",
            },
            {
              step: "3",
              title: "Get Recommendations",
              desc: "Receive a tailored list of crops with best yield potential.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.03 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-2xl font-bold text-green-600 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
