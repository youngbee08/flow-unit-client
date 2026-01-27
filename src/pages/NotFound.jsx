import { Ghost } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <span className="text-9xl font-black text-gray-200 select-none">
              404
            </span>
            <Ghost className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 h-16 w-16" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Lost in the void?
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for has vanished into another dimension.
          </p>
        </div>

        <Link
          to="/"
          className="inline-block px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary transition-colors"
        >
          Return to safety →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
