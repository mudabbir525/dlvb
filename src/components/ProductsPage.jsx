import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import test from "/src/assets/planeuron.jpg";
import neuh from "/src/assets/nuhemetide2.jpg";
import livtroc from "/src/assets/livtroc3.jpg";
import livtroc2 from "/src/assets/livtroc2.jpg";
import { Link } from "react-router-dom";
import creon from "/src/assets/pancreon.jpeg";

const ProductsPage = () => {
  const navigate = useNavigate();
  // const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    quantity: 1,
    product: "",
    totalPrice: "",
  });

  const products = [
    {
      id: 1,
      name: "LIVTROC",
      description:
        "Livtroc capsules contain tocotrienol, an advanced form of Vitamin E often referred to as the next generation Vitamin E due to its 40–60 times greater potency compared to synthetic Vitamin E. Livtroc is formulated to support the management of fatty liver and non-alcoholic steatohepatitis (NASH). Fatty liver, or hepatosteatosis, results from fat buildup in the liver, while NASH involves liver inflammation and damage caused by this fat accumulation.",
      disclaimer:
        "Use only under a doctor’s recommendation. Do not consume without a prescription.",
      price: 299.99,
      features: ["24/7 Monitoring", "AI Health Insights", "Mobile Integration"],
      images: [livtroc, livtroc2],
    },
    {
      id: 2,
      name: "NUHEMETIDE",
      description:
        "Nuhemetide Tablet is designed to deliver elemental iron in the form of heme iron polypeptides. This highly bioavailable form of iron is easily absorbed and utilized by the body, making it effective in addressing iron deficiency and promoting overall health.",
      disclaimer:
        "Use only under a doctor’s recommendation. Do not consume without a prescription.",
      price: 299.99,
      features: ["24/7 Monitoring", "AI Health Insights", "Mobile Integration"],
      images: [neuh, neuh],
    },
    {
      id: 3,
      name: "Pancreon-25000",
      description:
        "Pancreon-25000 Capsule is a specialized pancreatic enzyme supplement designed to improve digestion by aiding in the breakdown of fats, proteins, and carbohydrates. It supports individuals with pancreatic enzyme deficiency, enhancing nutrient absorption and reducing digestive discomfort effectively.",
      disclaimer:
        "Use Pancreon-25000 Capsule only under medical supervision. Consult your doctor before use, and do not exceed the prescribed dosage.",
      price: 299.99,
      features: [
        "Supports Digestive Health",
        "Enhances Nutrient Absorption",
        "Reduces Stool Frequency and Bloating",
      ],
      images: [creon, creon],
    },
  ];

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
    setFormData((prev) => ({
      ...prev,
      product: product.name,
      totalPrice: product.price.toFixed(2),
    }));
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, formData.quantity + change);
    setFormData((prev) => ({
      ...prev,
      quantity: newQuantity,
      totalPrice: (selectedProduct.price * newQuantity).toFixed(2),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Order placed successfully!");
      setShowOrderForm(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        quantity: 1,
        product: "",
        totalPrice: "",
      });
    } catch (error) {
      alert("Failed to place order. Please try again.");
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
  <>
    <Helmet>
      <title>
        DLVB IMPEX - Advanced Healthcare Products | Livtroc, Nuhemetide,
        Pancreon
      </title>
      <meta
        name="description"
        content="Discover innovative healthcare solutions from DLVB IMPEX. Our products include Livtroc for liver health, Nuhemetide for iron supplementation, and Pancreon-25000 for digestive support."
      />
      <meta
        name="keywords"
        content="Livtroc, Nuhemetide, Pancreon-25000, liver health, iron supplement, pancreatic enzyme, healthcare products"
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="DLVB IMPEX - Advanced Healthcare Products"
      />
      <meta
        property="og:description"
        content="Innovative healthcare solutions designed to enhance your well-being."
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "MedicalProduct",
              name: product.name,
              description: product.description,
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "INR",
              },
            },
          })),
        })}
      </script>
    </Helmet>
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
              Discover our innovative healthcare solutions designed to enhance
              your well-being.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`)}
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
              <h3 className="text-2xl font-bold mb-6">
                DLVB IMPEX PVT. LTD.
              </h3>
              <p className="text-gray-300 text-lg">
                Crafting Solutions for a Healthier Future
              </p>
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
  </>
);
};

export default ProductsPage;
