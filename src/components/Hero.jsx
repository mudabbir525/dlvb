import React from "react";
import Navbar from "./Navbar";
import { ArrowRight } from "lucide-react";
import icon1 from "../assets/1.webp";
import icon2 from "../assets/2.webp";
import icon3 from "../assets/3.webp";
import image5 from "../assets/5.png";
import { ShoppingCart, X, Plus, Minus, Phone, Mail, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative">
      <main className="min-h-screen bg-gradient-to-br from-[rgb(191,184,238)] to-[rgb(250,215,211)]">
        <div className="sticky top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="min-h-screen flex items-center justify-center flex-col gap-6 md:gap-12 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl w-full sm:w-4/5 md:w-3/5 text-gray-800 font-bold font-spaceGrotesk text-center">
            “Crafting Solutions for a Healthier Future”
          </h1>
          <p className="font-bold text-lg sm:text-xl md:text-2xl text-center">
            Trusted by the best
          </p>
        </div>

        {/* Why DLVB IMPEX Section */}
        <div className="max-w-7xl mx-auto  px-6 py-16">
          <h2 className="text-4xl mt-28 font-bold text-center text-gray-800 mb-16">
            Why DLVB IMPEX?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="p-8 bg-green-100 rounded-3xl transition-transform hover:scale-105">
              <img src={icon2} alt="Vision" className="w-28 z-10 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-gray-700">
                We aim to be a beacon of positive in the healthcare industry. It
                aspires to create change a profound impact on global health by
                delivering Innovative solutions that improve the quality of life
                for individuals.
              </p>
            </div>

            <div className="p-8 bg-gray-900 text-white rounded-3xl transition-transform hover:scale-105">
              <img src={icon1} alt="Mission" className="w-28 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p>
                Our mission is to Improve the well-being of individuals and
                communities by delivering high-quality, safe, and innovative
                pharmaceutical products and healthcare solutions. We are
                committed to scientific excellence, ethical practices, and a
                patient centric approach.
              </p>
            </div>

            <div className="p-8 bg-indigo-600 text-white rounded-3xl transition-transform hover:scale-105">
              <img src={icon3} alt="Commitment" className="w-28  mb-6" />
              <h3 className="text-2xl font-bold mb-4">Commitment</h3>
              <p>
                We, as a pharmaceutical company, pledge an unwavering commitment
                to the well-being of individuals and society. Our dedication
                extends to the pursuit of innovative pharmaceutical solutions,
                driven by the highest standards of scientific excellence,
                ethical conduct, and patient-centric values.
              </p>
            </div>
          </div>
        </div>

        {/* CEO Quote Section */}
        <div className="max-w-full mx-auto py-16  ">
          <div className="bg-[rgb(11,48,59)] min-h-72 py-28 flex text-white p-12 ">
            <div className="w-1/2"></div>
            <div className="w-1/2">
            <p className="text-3xl font-light italic mb-8">
              "We conduct ourselves with honesty integrity and transparency in
              all our actions. We adhere to all laws, regulations, and Industry
              standards relevant to our operations."
            </p>
            <p className="text-xl">CEO, DLVB IMPEX</p>
            </div>
          </div>
        </div>

        {/* Get Medicines Section */}
        <div className="max-w-full px-6 mx-5 py-16  bg-[rgb(254,244,238)] rounded-xl mt-16 mb-28">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="max-w-xl ml-8">
                <h2 className="text-4xl font-bold mb-6">
                  Get medicines with high quality
                </h2>
                <p className="text-gray-700 text-lg mb-8">
                  With DLVB IMPEX you can get all pharmaceutical solutions at
                  one stop. We are offering wide range of medicines with
                  maintaining high quality standards and regulating with
                  government. You can choose your medicine by clicking the below
                  button.
                </p>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  Explore the Products
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={image5}
                alt="Medicine reminder"
                className="rounded-full w-full max-w-xl mx-auto"
              />
            </div>
          </div>
        </div>

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

        {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">DLVB IMPEX PVT. LTD.</h3>
              <p className="text-gray-300 text-lg">Crafting Solutions for a Healthier Future</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {['Product', 'Company'].map((item) => (
                  <li key={item}>
                    <button className="text-gray-300 hover:text-white transition-colors">
                      {item === 'Product' ? 'Explore product' : 'About'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: "+91 83743 99149" },
                  { icon: Mail, text: "info.dlvbimpexpvtltd@gmail.com" },
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
      </main>
    </div>
  );
};

export default Hero;
