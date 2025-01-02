import React from "react";
import Navbar from "./Navbar";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import icon1 from "../assets/1.webp";
import icon2 from "../assets/2.webp";
import icon3 from "../assets/3.webp";
import image5 from "../assets/5.png";
import { ShoppingCart, X, Plus, Minus, Phone, Mail, MapPin } from 'lucide-react';

const Hero = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const cardAnimation = {
  initial: {
    opacity: 0,
    scale: 0.9,
    backdropFilter: "blur(0px)"
  },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"  
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    backdropFilter: "blur(12px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

  const iconGlowAnimation = {
    initial: {
      opacity: 0,
      scale: 0.5,
      filter: "brightness(1)"
    },
    whileInView: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.1,
      filter: "brightness(1.2)",
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  const iconAnimation = {
    initial: { opacity: 0, scale: 0.5 },
    whileInView: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const progressBar = {
    initial: { width: 0 },
    whileInView: {
      width: "100%",
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative">
      <main className="min-h-screen bg-gradient-to-br from-[rgb(191,184,238)] to-[rgb(250,215,211)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="sticky top-0 left-0 right-0 z-50"
        >
          <Navbar />
        </motion.div>

        <motion.div
          className="min-h-screen flex items-center justify-center flex-col gap-6 md:gap-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl w-full sm:w-4/5 md:w-3/5 text-gray-800 font-bold font-spaceGrotesk text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            "Crafting Solutions for a Healthier Future"
          </motion.h1>
          <motion.p
            className="font-bold text-lg sm:text-xl md:text-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Trusted by the best
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.h2
            className="text-4xl mt-28 font-bold text-center text-gray-800 mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            Why DLVB IMPEX?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: icon2, title: "Vision", bg: "bg-green-100", text: "We aim to be a beacon of positive in the healthcare industry. It aspires to create change a profound impact on global health by delivering Innovative solutions that improve the quality of life for individuals." },
              { icon: icon1, title: "Mission", bg: "bg-gray-900 text-white", text: "Our mission is to Improve the well-being of individuals and communities by delivering high-quality, safe, and innovative pharmaceutical products and healthcare solutions. We are committed to scientific excellence, ethical practices, and a patient centric approach." },
              { icon: icon3, title: "Commitment", bg: "bg-indigo-600 text-white", text: "We, as a pharmaceutical company, pledge an unwavering commitment to the well-being of individuals and society. Our dedication extends to the pursuit of innovative pharmaceutical solutions, driven by the highest standards of scientific excellence, ethical conduct, and patient-centric values." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`p-8 ${item.bg} rounded-3xl relative overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-2xl`}
                variants={cardAnimation}
                initial="initial"
                whileInView="whileInView"
                whileHover="hover"
                viewport={{ once: true }}
                custom={index}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1.5 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                />
                <motion.img
                  src={item.icon}
                  alt={item.title}
                  className="w-28 mb-6 relative z-10"
                  variants={iconGlowAnimation}
                  whileHover="hover"
                />
                <motion.h3
                  className="text-2xl font-bold mb-4 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.text}
                </motion.p>
              </motion.div>
            ))}

          </div>
        </div>

        <motion.div
          className="max-w-full mx-auto py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-[rgb(11,48,59)] min-h-72 py-28 flex text-white p-12 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <div className="w-1/2"></div>
            <motion.div
              className="w-1/2"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-3xl font-light italic mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                "We conduct ourselves with honesty integrity and transparency in all our actions..."
              </motion.p>
              <motion.p
                className="text-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                CEO, DLVB IMPEX
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="max-w-full px-6 mx-5 py-16 bg-[rgb(254,244,238)] rounded-xl mt-16 mb-28"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="max-w-xl ml-8">
                <motion.h2
                  className="text-4xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Get medicines with high quality
                </motion.h2>
                <motion.p
                  className="text-gray-700 text-lg mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  With DLVB IMPEX you can get all pharmaceutical solutions...
                </motion.p>
                <motion.button
                  className="px-6 py-3 bg-gray-900 text-white rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore the Products
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={image5}
                alt="Medicine reminder"
                className="rounded-full w-full max-w-xl mx-auto"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
          </div>
        </motion.div>

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
                  {['Product', 'Company'].map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button className="text-gray-300 hover:text-white transition-colors">
                        {item === 'Product' ? 'Explore product' : 'About'}
                      </button>
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
                    { icon: MapPin, text: "Hyderabad" }
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
        {/* Footer */}
        {/* <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4">Product</h3>
                <p className="text-gray-400">Explore product</p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <p className="text-gray-400">About</p>
              </div>
            </div>
            <div className="mt-16">
              <h2 className="text-2xl font-bold">DLVB IMPEX PVT. LTD.</h2>
            </div>
          </div>
        </footer> */}
      </main>
    </div>
  );
};

export default Hero;