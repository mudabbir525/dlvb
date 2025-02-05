import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Handshake, Award, Building2 } from 'lucide-react';
import { ShoppingCart, X, Plus, Minus, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";

const AboutPage = () => {
  const coreValues = [
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our interactions and decisions.",
      icon: Building2
    },
    {
      title: "Compassion",
      description: "We deeply care about the well-being of patients and the communities we serve.",
      icon: Heart
    },
    {
      title: "Collaboration",
      description: "We believe in the power of partnerships to achieve greater impact.",
      icon: Handshake
    },
    {
      title: "Quality",
      description: "We are dedicated to delivering products of uncompromising quality and safety.",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="pt-44 pb-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6 mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About DLVB IMPEX PVT. LTD.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Dedicated to advancing the frontiers of healthcare through cutting-edge innovation and compassionate patient care.
          </p>
        </motion.section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6">
          {/* Vision Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12"
          >
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              At DLVB IMPEX PVT. LTD., we are dedicated to advancing the frontiers of healthcare through cutting-edge innovation, and compassionate patient care. With a deep commitment to scientific excellence and ethical integrity, we strive to make a lasting impact on the lives of individuals and communities.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              We believe that the foundation of our success lies in the pursuit of scientific excellence. Our teams of renowned researchers, medical experts, and innovators collaborate to push the boundaries of medical science, seeking breakthroughs that have the potential to transform lives.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We are deeply rooted in the communities we serve. Through initiatives focused on education, healthcare access, and public health awareness, we actively engage with local communities to foster well-being and empowerment.
            </p>
          </motion.section>

          {/* Core Values Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Leadership Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-start gap-6">
              <Users className="w-12 h-12 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Leadership</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Our leadership team extends beyond these roles, encompassing a diverse group of professionals who contribute their expertise in various areas, including regulatory affairs, legal, marketing, and more.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  DLVB IMPEX PVT. LTD.'s leadership is united in its dedication to achieving our vision of Empowering Health, Enriching Lives. Through collaborative efforts and a commitment to excellence, our leadership team guides us on a path of innovation, integrity, and lasting impact.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
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
            { icon: Mail, text: "info@dlvbimpex.com" },
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

export default AboutPage;