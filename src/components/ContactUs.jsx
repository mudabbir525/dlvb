import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative">
      <div className="sticky top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mt-28 mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600">We're here to help and answer any questions you might have</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-100/80 backdrop-blur-lg rounded-3xl p-8 transition-transform hover:scale-105">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-900 text-white p-4 rounded-2xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+91 9876543210</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600 text-white p-4 rounded-2xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">info@dlvbimpex.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gray-900 text-white p-4 rounded-2xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">Hyderabad</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-3xl p-8 transition-transform hover:scale-105">
              <h2 className="text-3xl font-bold mb-8">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-medium mb-2" htmlFor="name">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2" htmlFor="phone">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2" htmlFor="email">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="text-green-400 text-center font-medium">Message sent successfully!</p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-center font-medium">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>

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
      </main>
    </div>
  );
};

export default ContactPage;