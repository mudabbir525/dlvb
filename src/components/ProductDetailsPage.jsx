import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ChevronLeft, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
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

const API_BASE_URL = "https://dlvbimpexpvtltd.com/backend";
const UPLOADS_BASE_URL = "https://dlvbimpexpvtltd.com/backend/uploads";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  const filename = imagePath.split("/").pop();
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
        const response = await fetch(
          `${API_BASE_URL}/fuck.php?timestamp=${new Date().getTime()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const productsArray = result.data || [];

        if (!Array.isArray(productsArray)) {
          throw new Error("Invalid data format: expected an array");
        }

        if (productsArray.length === 0) {
          throw new Error("No products found in the response");
        }

        // Find the current product
        const currentProduct = productsArray.find(
          (p) => p.slug === productId || p.id === productId
        );

        if (!currentProduct) {
          throw new Error(`Product with ID "${productId}" not found`);
        }

        // Process all four images
        currentProduct.images = [
          currentProduct.image_address1,
          currentProduct.image_address2,
          currentProduct.image_address3,
          currentProduct.image_address4
        ]
          .filter(Boolean)
          .map(getImageUrl);

        currentProduct.metaInfo = currentProduct.metaInfo || {
          title: currentProduct.meta_info_title || currentProduct.name || "Product Details",
          description: currentProduct.meta_info_description || currentProduct.description || "View our product details",
          canonical: currentProduct.meta_info_canonical || window.location.href,
        };

        setProduct(currentProduct);

        const otherProducts = productsArray.filter(
          (p) => p.id !== currentProduct.id && p.slug !== currentProduct.slug
        );
        setProducts(otherProducts);

        if (result.debug) {
          console.log("Debug info:", result.debug);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
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
        <div className="text-2xl text-gray-600 animate-pulse">
          Loading product details...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-pink-100">
        <div className="text-2xl text-red-600 mb-4">
          Error: {error || "Product not found"}
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        {product && product.metaInfo && (
          <Helmet>
            <title>{product.metaInfo.title}</title>
            <meta name="description" content={product.metaInfo.description} />
            <link rel="canonical" href={product.metaInfo.canonical} />
            <meta
              name="keywords"
              content={`DLVB IMPEX, ${
                product.name
              }, ${product.name.toLowerCase()}, advanced healthcare, ${
                product.slug
              }`}
            />
            <meta property="og:title" content={product.metaInfo.title} />
            <meta
              property="og:description"
              content={product.metaInfo.description}
            />
            <meta property="og:image" content={product.images[0]} />
            <meta property="og:url" content={product.metaInfo.canonical} />
            <meta property="og:type" content="product" />
            <meta name="robots" content="index, follow" />
            <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "Product",
                  "name": "${product.name}",
                  "image": ${JSON.stringify(product.images)},
                  "description": "${product.description}",
                  "brand": {
                    "@type": "Brand",
                    "name": "DLVB IMPEX"
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": "${product.price || ""}",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "reviewCount": "1"
                  }
                }
              `}
            </script>
          </Helmet>
        )}

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center text-gray-600 mb-8 mt-28">
            <Link to="/products" className="hover:text-gray-800">
              Products
            </Link>
            <ChevronRight className="mx-2 w-4 h-4" />
            <span className="font-semibold">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white p-8 mb-4">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.alt_text || product.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                
                {/* {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button 
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )} */}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex justify-center gap-4 mt-2 flex-wrap">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 bg-white rounded-lg overflow-hidden p-2 ${
                        currentImageIndex === index 
                          ? "border-2 border-purple-500 shadow-md" 
                          : "border border-gray-200"
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.alt_text || product.name} - Image ${index + 1}`}
                        className="w-full h-full object-contain" 
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Description
                </h2>
                <p className="text-gray-600">
                  {product.long_description || product.description}
                </p>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Medical Supervision Required
                </h3>
                <p className="text-blue-700">
                  {product.disclaimer || "This product should only be used under proper medical supervision. Please consult with a healthcare professional before use."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;