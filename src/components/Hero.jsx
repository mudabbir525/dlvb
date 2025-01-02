import React from 'react';
import Navbar from './Navbar';
import { ArrowRight } from 'lucide-react';
import icon1 from '../assets/1.webp';
import icon2 from '../assets/2.webp';
import icon3 from '../assets/3.webp';
import image5 from '../assets/5.png';

const Hero = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100">
      

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
                We aim to be a beacon of positive in the healthcare industry. It aspires to create change a profound impact on global health by delivering Innovative solutions that improve the quality of life for individuals.
              </p>
            </div>

            <div className="p-8 bg-gray-900 text-white rounded-3xl transition-transform hover:scale-105">
              <img src={icon1} alt="Mission" className="w-28 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p>
                Our mission is to Improve the well-being of individuals and communities by delivering high-quality, safe, and innovative pharmaceutical products and healthcare solutions. We are committed to scientific excellence, ethical practices, and a patient centric approach.
              </p>
            </div>

            <div className="p-8 bg-indigo-600 text-white rounded-3xl transition-transform hover:scale-105">
              <img src={icon3} alt="Commitment" className="w-28  mb-6" />
              <h3 className="text-2xl font-bold mb-4">Commitment</h3>
              <p>
                We, as a pharmaceutical company, pledge an unwavering commitment to the well-being of individuals and society. Our dedication extends to the pursuit of innovative pharmaceutical solutions, driven by the highest standards of scientific excellence, ethical conduct, and patient-centric values.
              </p>
            </div>
          </div>
        </div>

        {/* CEO Quote Section */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-gray-900 text-white p-12 rounded-3xl">
            <p className="text-3xl font-light italic mb-8">
              "We conduct ourselves with honesty integrity and transparency in all our actions. We adhere to all laws, regulations, and Industry standards relevant to our operations."
            </p>
            <p className="text-xl">CEO, DLVB IMPEX</p>
          </div>
        </div>

        {/* Get Medicines Section */}
        <div className="max-w-7xl mx-auto px-6 py-16  bg-white rounded-xl mt-16 mb-28">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold mb-6">
                  Get medicines with high quality
                </h2>
                <p className="text-gray-700 text-lg mb-8">
                  With DLVB IMPEX you can get all pharmaceutical solutions at one stop. We are offering wide range of medicines with maintaining high quality standards and regulating with government. You can choose your medicine by clicking the below button.
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
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
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
        </footer>
      </main>
    </div>
  );
};

export default Hero;