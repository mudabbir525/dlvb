import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from './Navbar';
import test from '../assets/test.png'

const ProductsPage = () => {
  const navigate = useNavigate();
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
      name: "BranikVit Pro",
      description: "Advanced health tracking with AI-powered insights. Features include continuous heart monitoring, sleep analysis, and real-time health alerts.",
      price: 299.99,
      features: ["24/7 Monitoring", "AI Health Insights", "Mobile Integration"]
    },
    {
      id: 2,
      name: "PalNeuron Plus",
      description: "Smart medication management with automated scheduling and real-time adherence tracking for optimal health outcomes.",
      price: 199.99,
      features: ["Smart Dispensing", "Alert System", "Usage Analytics"]
    },
    {
      id: 3,
      name: "BranikVit Complete",
      description: "Comprehensive health solution including premium devices and annual subscription to our analytics platform.",
      price: 499.99,
      features: ["Premium Devices", "Annual Platform Access", "Priority Support"]
    },
    {
      id: 4,
      name: "PalNeuron ECG",
      description: "Medical-grade ECG monitoring device with instant analysis and physician sharing capabilities.",
      price: 249.99,
      features: ["Medical Grade", "Real-time Analysis", "Doctor Connect"]
    },
    {
      id: 5,
      name: "BranikVit BP",
      description: "Advanced blood pressure monitor featuring cloud synchronization and comprehensive trend analysis.",
      price: 159.99,
      features: ["Cloud Sync", "Trend Reports", "Heart Detection"]
    },
    {
      id: 6,
      name: "PalNeuron Analytics",
      description: "Premium health analytics subscription with AI-powered insights and expert consultation.",
      price: 99.99,
      features: ["AI Insights", "Expert Access", "Monthly Reports"]
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement order submission logic here
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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg">
        <Navbar />
      </div>

      <main className="flex-grow py-20" style={{
        background: 'linear-gradient(135deg, #E6E6FA 0%, #B19CD9 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mt-24 mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Our Products</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our innovative healthcare solutions designed to enhance your well-being and revolutionize personal health monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} 
                className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <img
                    src={test}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-gray-800">
                    ₹{product.price}
                    </span>
                    <button
                      onClick={() => handleOrderClick(product)}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      Order
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowOrderForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Form</h2>
            <p className="text-gray-600 mb-6">Please fill in your details to place the order.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Product</label>
                <input
                  type="text"
                  value={formData.product}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-gray-800 font-semibold text-lg">{formData.quantity}</span>
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
                <label className="block text-gray-700 font-medium mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your email address"
                />
              </div>

              <div className="border-t pt-4 mt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-700 font-medium">Total Price:</span>
                  <span className="text-2xl font-bold text-gray-800">₹{formData.totalPrice}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  Place Order
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">DLVB IMPEX PVT. LTD.</h3>
              <p className="text-gray-300 text-lg">
                Crafting Solutions for a Healthier Future
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {['About Us', 'Products', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => navigate(`/${item.toLowerCase().replace(' ', '-')}`)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: "+91 9876543210" },
                  { icon: Mail, text: "info@dlvbimpex.com" },
                  { icon: MapPin, text: "Hyderabad" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <item.icon className="w-5 h-5" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;