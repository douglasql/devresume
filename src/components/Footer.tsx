import { FileText } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0 text-gray-700 dark:text-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">DevResume</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 DevResume. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;