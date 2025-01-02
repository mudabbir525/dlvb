import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactPage from './components/ContactUs';
import ProductsPage from './components/ProductsPage';
import Hero from './components/Hero';


const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

