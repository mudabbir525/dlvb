import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="absolute top-8 left-0 right-0 z-10">
      <div className="bg-white backdrop-blur-lg rounded-2xl p-7 flex justify-between items-center mx-4 shadow-lg">
        <div 
          onClick={() => navigate('/')} 
          className="text-black font-bold text-2xl cursor-pointer"
        >
          DLVB IMPEX PVT. LTD.
        </div>
        
        <div className="hidden md:flex space-x-6 text-black text-xl">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="hover:text-purple-300 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;