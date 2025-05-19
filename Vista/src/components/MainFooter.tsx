import React from 'react';

export const MainFooter: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Monitoring System</h3>
            <p className="text-gray-400">© 2024 All rights reserved</p>
          </div>

          <div className="flex space-x-6">
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-gray-400">support@monitoring.com</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
