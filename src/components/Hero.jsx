import React from 'react';
import { useState } from 'react';
import { Send, Eye, Target, Heart, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from './Navbar';
import ceo from '../assets/ceo.png'

const Hero = () => {
  return (
    <div className="relative">
      {/* Floating Navbar */}
      <div className="sticky top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className='bg-gradient-to-br from-cyan-600 to-blue-600'>
        {/* Hero Section */}
        <section className="py-32 min-h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              "Crafting Solutions for a Healthier Future"
            </h1>
            <p className="text-xl md:text-3xl text-gray-100 mb-8">
              Trusted by the best
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>
        </section>

        {/* Vision Mission Section */}
        <section className="py-24 px-7">
          <div className="max-w-full  mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Eye,
                  title: "Vision",
                  desc: "We aim to be a beacon of positive in the healthcare industry. It aspires to create change a profound impact on global health by delivering Innovative solutions that improve the quality of life for individuals."
                },
                {
                  icon: Target,
                  title: "Mission",
                  desc: "Our mission is to Improve the well-being of individuals and communities by delivering high- quality, safe, and innovative pharmaceutical products and healthcare solutions. We are committed to scientific excellence, ethical practices, and a patient centric approach."
                },
                {
                  icon: Heart,
                  title: "Commitment",
                  desc: "We, as a pharmaceutical company, pledge an unwavering commitment to the well-being of individuals and society. Our dedication extends to the pursuit of innovative pharmaceutical solutions, driven by the highest standards of scientific excellence, ethical conduct, and patient-centric values."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-white/20">
                  <item.icon className="text-white w-16 h-16 mb-6" />
                  <h3 className="text-white text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-100 text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="pt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
              <p className="text-white text-2xl md:text-3xl italic mb-6 leading-relaxed">
              “We conduct ourselves with honesty integrity and transparency in all our actions. We adhere to all laws, regulations, and Industry standards relevant to our operations.”
              </p>
              <div className="flex items-center gap-4">
                <div className="">
                <img src={ceo} alt="" className='w-16 rounded-full bg-white/20' /></div>
                <div>
                  <p className="text-white text-xl font-bold">Bajjesh</p>
                  <p className="text-gray-100">CEO, DLVB IMPEX</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Get medicines with high quality
                </h2>
                <p className="text-gray-100 text-xl mb-8">
                With DLVB IMPEX you can get all pharmaceutical solutions at one stop. We are offering wide range of medicines with maintaining high quality standards and regulating with government. You can choose your medicine by clicking the below button.
                </p>
                <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2">
                Explore the Products
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <img 
                    src="https://media.licdn.com/dms/image/D4E12AQEaoQMHIkPAhA/article-cover_image-shrink_720_1280/0/1680788919777?e=2147483647&v=beta&t=mJ-uE1uQpw5sVmBOtcwBu1c2zs5qE0RW3VTBJRtub3I" 
                    alt="Medical Innovation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
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
    </div>
  );
};

export default Hero;