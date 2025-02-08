import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";


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

const API_BASE_URL = 'https://dlvbimpexpvtltd.com/backend';
const UPLOADS_BASE_URL = 'https://dlvbimpexpvtltd.com/backend/uploads';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  const filename = imagePath.split('/').pop();
  return `${UPLOADS_BASE_URL}/${filename}`;
};

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      
    try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/fuck.php?timestamp=${new Date().getTime()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Handle the new API response structure
        const productsArray = result.data || [];
        
        if (!Array.isArray(productsArray)) {
          throw new Error('Invalid data format: expected an array');
        }

        if (productsArray.length === 0) {
          throw new Error('No products found in the response');
        }

        // Find the current product based on productId from URL
        const currentProduct = productsArray.find(p => p.slug === productId || p.id === productId);
        
        if (!currentProduct) {
          throw new Error(`Product with ID "${productId}" not found`);
        }

        // Process images for the current product
        currentProduct.images = [
          currentProduct.image_address1,
          currentProduct.image_address2
        ].filter(Boolean).map(getImageUrl);

        setProduct(currentProduct);

        // Set other products (excluding current product)
        const otherProducts = productsArray.filter(p => 
          p.id !== currentProduct.id && p.slug !== currentProduct.slug
        );
        setProducts(otherProducts);

        // Log debug info if available
        if (result.debug) {
          console.log('Debug info:', result.debug);
        }

      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProducts();
    }
  }, [productId]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-100">
        <div className="text-2xl text-gray-600 animate-pulse">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-pink-100">
        <div className="text-2xl text-red-600 mb-4">
          Error: {error || 'Product not found'}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

 

  const images = [product.image_address1, product.image_address2].filter(Boolean);
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {product && (
        <Helmet>
          <title>{product.meta_info_title}</title>
          <meta name="description" content={product.meta_info_description} />
          <link rel="canonical" href={product.meta_info_canonical} />
          <meta name="keywords" content={`DLVB IMPEX, ${product.name}, ${product.name.toLowerCase()}, advanced healthcare, ${product.slug}`} />
          <meta property="og:title" content={product.meta_info_title} />
          <meta property="og:description" content={product.meta_info_description} />
          <meta property="og:image" content={getImageUrl(product.image_address1)} />
          <meta property="og:url" content={product.meta_info_canonical} />
          <meta property="og:type" content="product" />
          <meta name="robots" content="index, follow" />
          <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "${product.name}",
              "image": "${product.images[0]}",
              "description": "${product.description}",
              "brand": {
                "@type": "Brand",
                "name": "DLVB IMPEX"
              }
            }
          `}
        </script>

        </Helmet>
        
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center text-gray-600 mb-8 mt-28">
          <Link to="/products" className="hover:text-gray-800">Products</Link>
          <ChevronRight className="mx-2 w-4 h-4" />
          <span className="font-semibold">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white p-8">
            <img
              src={getImageUrl(images[currentImageIndex])}
              alt={product.alt_text}
              className="w-full h-full object-contain"
              loading="lazy"
            />

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${currentImageIndex === index
                      ? "bg-gray-800"
                      : "bg-gray-300"
                      }`}
                    aria-label={`View image ${index + 1} of ${images.length}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            {/* <div className="text-2xl font-semibold text-gray-600 mb-6">
              ₹{product.price}
            </div> */}

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-600">{product.long_description}</p>
            </div>

            {/* <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Important Information
              </h2>
              <p className="text-gray-600 italic">{product.disclaimer}</p>
            </div> */}

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Medical Supervision Required
              </h3>
              <p className="text-blue-700">
                This product should only be used under proper medical supervision.
                Please consult with a healthcare professional before use.
              </p>
            </div>
          </div>
        </div>

        {products.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Other Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((otherProduct) => (
                <Link
                  to={`/product/${otherProduct.slug}`}
                  key={otherProduct.id}
                  className="bg-white rounded-xl  overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-square bg-white p-4 flex items-center justify-center">
                    <img
                      src={getImageUrl(otherProduct.image_address1)}
                      alt={otherProduct.alt_text}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {otherProduct.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {otherProduct.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

    
    </div>
    <Footer /></>
  );
};

export default ProductDetailsPage;





