import React from 'react';

const Navbar = () => {
  return (
    <nav className="absolute top-8 left-0 right-0 z-10">
      <div className="bg-white backdrop-blur-lg rounded-2xl p-7 flex justify-between items-center mx-4 shadow-lg">
        <div className="text-black font-bold text-2xl">DLVB IMPEX PVT. LTD.</div>
        <div className="hidden md:flex space-x-6 text-black text-xl">
          <a href="/" className="hover:text-purple-300 transition-colors">Home</a>
          <a href="/products" className="hover:text-purple-300 transition-colors">Products</a>
          <a href="/contact" className="hover:text-purple-300 transition-colors">Contact</a>
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
