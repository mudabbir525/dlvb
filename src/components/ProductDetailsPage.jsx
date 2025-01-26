import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import livtroc2 from '../assets/livtroc2.jpg';
import livtroc3 from '../assets/livtroc3.jpg';
import nuhemetide2 from "../assets/nuhemetide2.jpg";
import pancreon from "../assets/pancreon.jpeg";



const products = [
  {
    id: 1,
    name: "LIVTROC",
    description:
      "Livtroc capsules contain tocotrienol, an advanced form of Vitamin E often referred to as the next generation Vitamin E due to its 40–60 times greater potency compared to synthetic Vitamin E. Livtroc is formulated to support the management of fatty liver and non-alcoholic steatohepatitis (NASH). Fatty liver, or hepatosteatosis, results from fat buildup in the liver, while NASH involves liver inflammation and damage caused by this fat accumulation.",
    disclaimer:
      "Use only under a doctor's recommendation. Do not consume without a prescription.",
    // price: 299.99,
    // features: ["24/7 Monitoring", "AI Health Insights", "Mobile Integration"],
    images: [ livtroc3 , livtroc2
    ],
  },
  {
    id: 2,
    name: "NUHEMETIDE",
    description:
      "Nuhemetide Tablet is designed to deliver elemental iron in the form of heme iron polypeptides. This highly bioavailable form of iron is easily absorbed and utilized by the body, making it effective in addressing iron deficiency and promoting overall health.",
    disclaimer:
      "Use only under a doctor's recommendation. Do not consume without a prescription.",
    price: 299.99,
    features: ["24/7 Monitoring", "AI Health Insights", "Mobile Integration"],
    images: [
    nuhemetide2 , nuhemetide2
    ],
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
    images: [
      pancreon, 
      pancreon
    ],
  },
];

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const selectedProduct = products.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === productId);
    setProduct(selectedProduct);
  }, [productId]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const otherProducts = products.filter(p => p.id !== product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100">
        <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <Helmet>
        <title>{product.name} | DLVB IMPEX</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-gray-600 mb-8 mt-28">
          <Link to="/products" className="hover:text-gray-800">Products</Link>
          <ChevronRight className="mx-2 w-4 h-4" />
          <span className="font-semibold">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-contain" 
            />
            
            {/* Image Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index 
                      ? "bg-white" 
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            
            {/* <p className="text-2xl font-semibold text-gray-700 mb-6">
              ₹{product.price.toFixed(2)}
            </p> */}

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Disclaimer
              </h2>
              <p className="text-gray-600 italic">{product.disclaimer}</p>
            </div>

            {/* <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-full">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100 rounded-l-full"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-4">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100 rounded-r-full"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <button className="flex items-center bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart
              </button>
            </div> */}
          </div>
        </div>

        {/* Other Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Other Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProducts.map((otherProduct) => (
              <Link 
                to={`/product/${otherProduct.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={otherProduct.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img 
                    src={otherProduct.images[0]} 
                    alt={otherProduct.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {otherProduct.name}
                  </h3>
                  {/* <p className="text-gray-600 mt-2">
                    ₹{otherProduct.price.toFixed(2)}
                  </p> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

// http://localhost:5175/product/livtroc