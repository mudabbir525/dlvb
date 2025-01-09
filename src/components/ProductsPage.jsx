import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import test from '/src/assets/planeuron.jpg'
import neuh from '/src/assets/nuhemetide2.jpg'
import livtroc from '/src/assets/livtroc3.jpg'
import livtroc2 from '/src/assets/livtroc2.jpg'
import { Link } from "react-router-dom";
import creon from '/src/assets/pancreon.jpeg'

const ProductsPage = () => {
  const navigate = useNavigate();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    quantity: 1,
    product: '',
    totalPrice: ''
  });



  const products = [
    {
      id: 1,
      name: "LIVTROC",
      description: "Livtroc capsules contain tocotrienol, an advanced form of Vitamin E often referred to as the next generation Vitamin E due to its 40–60 times greater potency compared to synthetic Vitamin E. Livtroc is formulated to support the management of fatty liver and non-alcoholic steatohepatitis (NASH). Fatty liver, or hepatosteatosis, results from fat buildup in the liver, while NASH involves liver inflammation and damage caused by this fat accumulation.",
      disclaimer: "Use only under a doctor’s recommendation. Do not consume without a prescription.",
      price: 299.99,
      features: ["24/7 Monitoring", "AI Health Insights", "Mobile Integration"],
      images: [livtroc, livtroc2] 
    },
    {
      id: 2,
      name: "NUHEMETIDE",
      description: "Nuhemetide Tablet is designed to deliver elemental iron in the form of heme iron polypeptides. This highly bioavailable form of iron is easily absorbed and utilized by the body, making it effective in addressing iron deficiency and promoting overall health.",
      disclaimer: "Use only under a doctor’s recommendation. Do not consume without a prescription.",
      price: 299.99,
      features: ["24/7 Monitoring", "AI Health Insights", "Mobile Integration"],
      images: [neuh, neuh]
    },
  {
  id: 3,
  name: "Pancreon-25000",
  description: "Pancreon-25000 Capsule is a specialized pancreatic enzyme supplement designed to improve digestion by aiding in the breakdown of fats, proteins, and carbohydrates. It supports individuals with pancreatic enzyme deficiency, enhancing nutrient absorption and reducing digestive discomfort effectively.",
  disclaimer: "Use Pancreon-25000 Capsule only under medical supervision. Consult your doctor before use, and do not exceed the prescribed dosage.",
  price: 299.99,
  features: ["Supports Digestive Health", "Enhances Nutrient Absorption", "Reduces Stool Frequency and Bloating"],
  images: [creon, creon]
}
,
    // {
    //   id: 3,
    //   name: "BranikVit Pro",
    //   description: "Advanced health tracking with AI-powered insights. Features include continuous heart monitoring, sleep analysis, and real-time health alerts.",
    //   disclaimer: "Consult your healthcare provider before use. Not a substitute for professional medical advice.",
    //   price: 299.99,
    //   features: ["24/7 Monitoring", "AI Health Insights", "Mobile Integration"],
    //   images: [test, test, test] // Replace with actual image paths
    // },
  ];

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
    setFormData(prev => ({
      ...prev,
      product: product.name,
      totalPrice: product.price.toFixed(2)
    }));
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, formData.quantity + change);
    setFormData(prev => ({
      ...prev,
      quantity: newQuantity,
      totalPrice: (selectedProduct.price * newQuantity).toFixed(2)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert('Order placed successfully!');
      setShowOrderForm(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        quantity: 1,
        product: '',
        totalPrice: ''
      });
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  useEffect(() => {
    let interval;
    if (selectedProduct) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === selectedProduct.images.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [selectedProduct]);

  return (
    <div className="relative min-h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-20 mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Products
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our innovative healthcare solutions designed to enhance your well-being.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-video bg-white p-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left side - Image Carousel */}
            <div className="relative aspect-square  rounded-2xl overflow-hidden">
              {selectedProduct.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${selectedProduct.name} view ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: currentImageIndex === index ? 1 : 0,
                    transition: { duration: 0.5 }
                  }}
                />
              ))}
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {selectedProduct.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right side - Content */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedProduct.name}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>

                <div>
                  {/* <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3> */}
                  {/*<ul className="space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>*/}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer</h3>
                  <p className="text-gray-600">{selectedProduct.disclaimer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}


<motion.footer
  className="bg-gray-900 text-white py-16"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-6">DLVB IMPEX PVT. LTD.</h3>
        <p className="text-gray-300 text-lg">Crafting Solutions for a Healthier Future</p>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-xl font-bold mb-6">Quick Links</h3>
        <ul className="space-y-4">
          {[
            { label: "Explore product", to: "/products" },
            { label: "About", to: "/about" },
          ].map((item) => (
            <motion.li
              key={item.label}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={item.to}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-6">Contact Info</h3>
        <div className="space-y-4">
          {[
            { icon: Phone, text: "+91 83743 99149" },
            { icon: Mail, text: "info.dlvbimpexpvtltd@gmail.com" },
            { icon: MapPin, text: "Hyderabad" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 text-gray-300"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
</motion.footer>
    </div>
  );
};

export default ProductsPage;