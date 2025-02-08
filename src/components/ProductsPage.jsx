import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin } from "lucide-react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const API_BASE_URL = 'https://dlvbimpexpvtltd.com/backend';
const UPLOADS_BASE_URL = 'https://dlvbimpexpvtltd.com/backend/uploads';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // Extract just the filename from the path
  const filename = imagePath.split('/').pop();
  return `${UPLOADS_BASE_URL}/${filename}`;
};

const ProductCard = ({ product, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onClick={onClick}
    className="cursor-pointer bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
  >
    <div className="aspect-video bg-white p-4">
      <img
        src={getImageUrl(product.image_address1)}
        alt={product.altText || product.name}
        className="w-full h-full object-contain"

      />
    </div>
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
      {product.disclaimer && (
        <p className="text-sm text-gray-500 italic line-clamp-2">{product.disclaimer}</p>
      )}
    </div>
  </motion.div>
);

const Footer = () => (
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
              { icon: Mail, text: "info@dlvbimpex.com" },
              { icon: MapPin, text: "Hyderabad" },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 text-gray-300 list-none"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.text}</span>
              </motion.li>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.footer>
);

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    


const fetchProducts = async () => {

    try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/fuck.php?timestamp=${new Date().getTime()}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }
    const result = await response.json();
    console.log("API Response:", result); // Log the API response

    // Check if we have data in the new format
    const data = result.data || result;
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received");
    }
    console.log("Fetched Products:", data); // Log fetched products
    setProducts(data.sort((a, b) => a.name.localeCompare(b.name)));

    // Optional: Log debug info if available
    if (result.debug) {
      console.log('Debug info:', result.debug);
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-100">
        <div className="text-2xl text-gray-600 animate-pulse">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-pink-100">
        <div className="text-2xl text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

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
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onClick={() => navigate(`/product/${product.slug}`)}
                />
              ))}
            </div>
          </div>
        </main>


      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;