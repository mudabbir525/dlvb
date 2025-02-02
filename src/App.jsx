import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactPage from './components/ContactUs';
import ProductsPage from './components/ProductsPage';
import Hero from './components/Hero';
import AboutPage from './components/AboutPage';
import { HelmetProvider } from 'react-helmet-async';
import ProductDetailsPage from './components/ProductDetailsPage';
import NotFound from './components/NotFound';
import MedicationForm from './components/back/MedicationForm';
import MedicationsDisplay from './components/back/MedicationsDisplay';
import MedicationEdit from './components/back/MedicationEdit';

const App = () => {
  return (
    <HelmetProvider>
    <Router>
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/siddesh" element={<MedicationForm />} />
        <Route path="/sid" element={<MedicationsDisplay />} />
        <Route path="/edit/:id" element={<MedicationEdit />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </Router>
    </HelmetProvider>
  );
};

export default App;

