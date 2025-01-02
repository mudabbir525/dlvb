import React, { useState } from 'react';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Navbar from './Navbar';
import { Phone ,Mail,MapPin} from 'lucide-react';

const ContactPage = () => {
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

    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    )
    .then((response) => {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    })
    .catch((error) => {
      setStatus('error');
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    <div className="sticky top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
    <div className='min-h-screen bg-gradient-to-br from-cyan-600 to-blue-600'>
    <div className="min-h-screen py-24" style={{
      background: `linear-gradient(to bottom right, rgb(190,184,232), rgb(201,192,213))`
    }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 mt-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 mb-2" htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-gray-800 mb-2" htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="block text-gray-800 mb-2" htmlFor="email">Email (Optional)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your email address"
              />
            </div>

            <div>
              <label className="block text-gray-800 mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your message"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-white text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
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
              <p className="text-green-700 text-center">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-700 text-center">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
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

export default ContactPage;