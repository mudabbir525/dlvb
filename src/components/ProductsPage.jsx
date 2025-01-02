import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import emailjs from '@emailjs/browser';
import sample from '../assets/test.png'
import { Phone ,Mail,MapPin} from 'lucide-react';
import Navbar from './Navbar';
const ProductsPage = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      name: "branikvit",
      description: "24/7 health tracking with AI-powered insights. Features include heart rate monitoring, sleep tracking, and real-time health alerts.",
      price: 299.99,
      image: {sample},
      features: ["24/7 Monitoring", "AI Health Insights", "Mobile App Integration"]
    },
    {
      id: 2,
      name: "palneuron",
      description: "Automated medication management system with scheduling, reminders, and dosage tracking for optimal medication adherence.",
      price: 199.99,
      image: {sample},
      features: ["Automated Dispensing", "Reminder System", "Dosage Tracking"]
    },
    {
      id: 3,
      name: "branikvit",
      description: "Complete health monitoring solution including all our premium devices and a 1-year subscription to our health analytics platform.",
      price: 499.99,
      image: {sample},
      features: ["All Premium Devices", "1-Year Subscription", "24/7 Support"]
    },
    {
      id: 4,
      name: "palneuron",
      description: "Clinical-grade ECG monitoring in a compact device. Perfect for home use with instant results and doctor sharing capabilities.",
      price: 249.99,
      image: {sample},
      features: ["Clinical Grade", "Instant Results", "Doctor Sharing"]
    },
    {
      id: 5,
      name: "branikvit",
      description: "Premium blood pressure monitor with cloud sync and trend analysis. Includes irregular heartbeat detection.",
      price: 159.99,
      image: {sample},
      features: ["Cloud Sync", "Trend Analysis", "Heartbeat Detection"]
    },
    {
      id: 6,
      name: "palneuron",
      description: "Annual subscription to our advanced health analytics platform. Get personalized insights and recommendations.",
      price: 99.99,
      image: {sample},
      features: ["Personalized Insights", "Monthly Reports", "Expert Consultation"]
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        ...formData,
        totalPrice: `$${formData.totalPrice}`
      },
      'YOUR_PUBLIC_KEY'
    )
    .then((response) => {
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
    })
    .catch((error) => {
      alert('Failed to place order. Please try again.');
    });
  };

  return (
    <>
    <div className="sticky top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
    <div className="min-h-screen py-20" style={{
      background: `linear-gradient(to bottom right, rgb(190,184,232), rgb(201,192,213))`
    }}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Our Products</h1>
        <p className="text-gray-700 text-center mb-12 max-w-2xl mx-auto">
          Discover our range of innovative healthcare products designed to enhance your well-being and simplify health monitoring.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/20 backdrop-blur-lg rounded-xl hover:transform hover:scale-105 transition-all">
              <img
                src={sample}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <div className='p-4'>
              <h3 className="text-gray-800 text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-800 text-xl font-bold">${product.price}</span>
                <button
                  onClick={() => handleOrderClick(product)}
                  className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  Order Now
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Form Modal */}
        {showOrderForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setShowOrderForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Form</h2>
              <p className="text-gray-600 mb-6">Please fill in your details to place the order.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="product">Product</label>
                  <input
                    type="text"
                    id="product"
                    value={formData.product}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-gray-800 font-semibold">{formData.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">Email (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                    placeholder="Your email address"
                  />
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-700 font-semibold">Total Price:</span>
                    <span className="text-gray-800 text-xl font-bold">${formData.totalPrice}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Place Order
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    {/* Footer */}
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">MediCare+</h3>
              <p className="text-gray-300 text-lg">
                Transforming healthcare through innovation and compassion
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {['About Us', 'Products', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: Mail, text: "info@medicare-plus.com" },
                  { icon: MapPin, text: "123 Innovation Drive" }
                ].map((item, index) => (
                  <p key={index} className="flex items-center gap-3 text-gray-300">
                    <item.icon className="w-5 h-5" />
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ProductsPage;