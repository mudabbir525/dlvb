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
import { Link } from "react-router-dom";
import livtroc from "/src/assets/livtroc3.jpg";
import livtroc2 from "/src/assets/livtroc2.jpg";
import neuh from "/src/assets/nuhemetide2.jpg";
import creon from "/src/assets/pancreon.jpeg";
import dianurovit from "../assets/dianurovit.jpg";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    quantity: 1,
    product: "",
  
  });

  const products = [
    {
      id: 1,
      name: "LIVTROC",
      description: "Livtroc softgel capsules with tocotrienol, a potent Vitamin E, support fatty liver & NASH management. Promote liver health with advanced nutrition.",
      disclaimer: "Use only under a doctor's recommendation. Do not consume without a prescription.",
      images: [livtroc, livtroc2],
      altText: "Livtroc - Tocotrienol soft Gelatin Capsules",
      slug: "livtroc"
    },
    {
      id: 2,
      name: "NUHEMETIDE",
      description: "Nuhemetide 12mg tablets with heme iron polypeptides offer superior absorption to combat iron deficiency and support overall health effectively.",
      disclaimer: "Use only under a doctor's recommendation. Do not consume without a prescription.",
      images: [neuh, neuh],
      altText: "NUHEMETIDE - Heme Iron Polypeptides",
      slug: "nuhemetide"
    },
    {
      id: 3,
      name: "Pancreon-25000",
      description: "Pancreon-25000 capsules aid digestion with pancreatic enzymes, improving nutrient absorption and supporting those with enzyme deficiencies.",
      disclaimer: "Use Pancreon-25000 Capsule only under medical supervision. Consult your doctor before use.",
      images: [creon, creon],
      altText: "Pancreon-25000- Pancreatic enzyme supplement",
      slug: "pancreon-25000"
    },
    {
  id: 4,
  name: "Dianurovit",
  description: "Dianurovit Softgel Capsules combine Omega 3 Fatty Acids, Biotin, Green Tea Extract, Ginkgo Biloba Extract, Ginseng Extract, Grape Seed Extract, Garlic Extract, Antioxidants, Vitamins, Minerals, and Trace Elements to support overall health, vitality, and well-being.",
  disclaimer: "This product is a nutraceutical and not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use.",
  images: [dianurovit, dianurovit],
  altText: "Dianurovit - Softgel Capsules with Omega 3, Biotin, and Antioxidants",
  slug: "dianurovit-softgel-capsules",
  
}
  ];

  return (
    <>
      <Helmet>
        <title>Advanced Health Care Products | DLVB IMPEX LTD</title>
        <meta
          name="description"
          content="Explore DLVB IMPEX LTD's advanced healthcare products designed for innovation, safety, and excellence. Advancing premium healthcare for a better tomorrow."
        />
        <meta
          name="keywords"
          content="DLVB IMPEX, healthcare products, Livtroc, Nuhemetide, Pancreon-25000, liver health, iron supplements, digestive enzymes"
        />
        <link rel="canonical" href="https://dlvbimpexpvtltd.com/products" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Advanced Health Care Products | DLVB IMPEX LTD" />
        <meta property="og:description" content="Explore DLVB IMPEX LTD's advanced healthcare products designed for innovation, safety, and excellence." />
        <meta property="og:url" content="https://dlvbimpexpvtltd.com/products" />
        <meta name="robots" content="index, follow" />
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
                Discover our innovative healthcare solutions designed to enhance your well-being.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="cursor-pointer bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="aspect-video bg-white p-4">
                    <img
                      src={product.images[0]}
                      alt={product.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
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
                    { label: "Explore Products", to: "/products" },
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