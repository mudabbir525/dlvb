import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="absolute top-8 left-0 right-0 z-10">
      <div className="bg-[rgb(254,244,238)] backdrop-blur-lg rounded-2xl p-7 flex justify-between items-center mx-4">
        <div 
          onClick={() => handleNavigate('/')} 
          className="text-black font-bold text-4xl cursor-pointer"
        >
          DLVB IMPEX PVT. LTD.
        </div>
        
        <div className="hidden md:flex space-x-6 text-black text-xl">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className="hover:text-purple-300 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button 
          className="md:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4">
          <div className="bg-[rgb(254,244,238)] rounded-lg shadow-lg p-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="block w-full text-left text-black text-xl py-2 px-4 hover:bg-purple-100 rounded transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;