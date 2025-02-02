import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const API_BASE_URL = 'https://dlvbimpexpvtltd.com/backend';
  const UPLOADS_BASE_URL = 'https://dlvbimpexpvtltd.com/backend/uploads';

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    // Extract just the filename from the path
    const filename = imagePath.split('/').pop();
    return `${UPLOADS_BASE_URL}/${filename}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get.php`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        // Find the current product based on slug
        const currentProduct = data.find(p => p.slug === productId);
        if (currentProduct) {
          // Process image URLs
          currentProduct.images = [
            currentProduct.image_address1,
            currentProduct.image_address2
          ]
            .filter(Boolean)
            .map(getImageUrl);

          setProduct(currentProduct);

          // Set other products (excluding current product)
          const otherProducts = data.filter(p => p.slug !== productId);
          setProducts(otherProducts);
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
          "image": "${getImageUrl(product.image_address1)}",
          "description": "${product.description}",
          "brand": {
            "@type": "Brand",
            "name": "DLVB IMPEX"
          },
          "offers": {
            "@type": "Offer",
            "price": "${product.price}",
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

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Important Information
              </h2>
              <p className="text-gray-600 italic">{product.disclaimer}</p>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {products.map((otherProduct) => (
                <Link
                  to={`/product/${otherProduct.slug}`}
                  key={otherProduct.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
  );
};

export default ProductDetailsPage;