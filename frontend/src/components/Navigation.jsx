import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Home, Sprout, Cloud, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const currentPage = location.pathname;
  const logoRef = useRef(null);

  useEffect(() => {
  if (logoRef.current) {
    gsap.to(logoRef.current, {
      scale: 1.15,        // slightly bigger bounce
      duration: 0.6,      // faster than before
      ease: "power1.inOut", // smoother and more energetic
      repeat: -1,          // infinite loop
      yoyo: true,          // grow and shrink back
      transformOrigin: "center center", // scale from center
    });
  }
}, []);


  return (
    <nav className="bg-green-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sprout className="w-8 h-8" />
          <span
            ref={logoRef}
            className="text-xl font-bold"
          >
            AgriBrain
          </span>
        </div>
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`flex items-center space-x-1 px-3 py-2 rounded transition ${
              currentPage === "/" ? "bg-green-700" : "hover:bg-green-700"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            to="/recommendations"
            className={`flex items-center space-x-1 px-3 py-2 rounded transition ${
              currentPage === "/recommendations"
                ? "bg-green-700"
                : "hover:bg-green-700"
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Recommendations</span>
          </Link>
          <Link
            to="/weather"
            className={`flex items-center space-x-1 px-3 py-2 rounded transition ${
              currentPage === "/weather" ? "bg-green-700" : "hover:bg-green-700"
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Weather & Soil</span>
          </Link>
          <Link
            to="/support"
            className={`flex items-center space-x-1 px-3 py-2 rounded transition ${
              currentPage === "/support" ? "bg-green-700" : "hover:bg-green-700"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
