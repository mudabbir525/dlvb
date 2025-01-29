
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
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
    description: "Livtroc softgel capsules with tocotrienol, a potent Vitamin E, support fatty liver & NASH management. Promote liver health with advanced nutrition.",
    longDescription: "Livtroc capsules contain tocotrienol, an advanced form of Vitamin E often referred to as the next generation Vitamin E due to its 40–60 times greater potency compared to synthetic Vitamin E. Livtroc is formulated to support the management of fatty liver and non-alcoholic steatohepatitis (NASH).",
    disclaimer: "Use only under a doctor's recommendation. Do not consume without a prescription.",
    images: [livtroc3, livtroc2],
    altText: "Livtroc - Tocotrienol soft Gelatin Capsules",
    slug: "livtroc",
    metaInfo: {
      title: "Livtroc Capsules – Advanced Liver Health | DLVB IMPEX LTD",
      description: "Livtroc softgel capsules with tocotrienol, a potent Vitamin E, support fatty liver & NASH management. Promote liver health with advanced nutrition.",
      canonical: "https://dlvbimpexpvtltd.com/product/livtroc"
    }
  },
  {
    id: 2,
    name: "NUHEMETIDE",
    description: "Nuhemetide 12mg tablets with heme iron polypeptides offer superior absorption to combat iron deficiency and support overall health effectively.",
    longDescription: "Nuhemetide Tablet is designed to deliver elemental iron in the form of heme iron polypeptides. This highly bioavailable form of iron is easily absorbed and utilized by the body, making it effective in addressing iron deficiency and promoting overall health.",
    disclaimer: "Use only under a doctor's recommendation. Do not consume without a prescription.",
    images: [nuhemetide2, nuhemetide2],
    altText: "NUHEMETIDE - Heme Iron Polypeptides",
    slug: "nuhemetide",
    metaInfo: {
      title: "Nuhemetide 12mg Tablets – Iron Supplement | DLVB IMPEX LTD",
      description: "Nuhemetide 12mg tablets with heme iron polypeptides offer superior absorption to combat iron deficiency and support overall health effectively.",
      canonical: "https://dlvbimpexpvtltd.com/product/nuhemetide"
    }
  },
  {
    id: 3,
    name: "Pancreon-25000",
    description: "Pancreon-25000 capsules aid digestion with pancreatic enzymes, improving nutrient absorption and supporting those with enzyme deficiencies.",
    longDescription: "Pancreon-25000 Capsule is a specialized pancreatic enzyme supplement designed to improve digestion by aiding in the breakdown of fats, proteins, and carbohydrates. It supports individuals with pancreatic enzyme deficiency, enhancing nutrient absorption and reducing digestive discomfort effectively.",
    disclaimer: "Use Pancreon-25000 Capsule only under medical supervision. Consult your doctor before use.",
    images: [pancreon, pancreon],
    altText: "Pancreon-25000- Pancreatic enzyme supplement",
    slug: "pancreon-25000",
    metaInfo: {
      title: "Pancreon-25000 Capsules | Digestive Enzyme | DLVB IMPEX LTD",
      description: "Pancreon-25000 capsules aid digestion with pancreatic enzymes, improving nutrient absorption and supporting those with enzyme deficiencies.",
      canonical: "https://dlvbimpexpvtltd.com/product/pancreon-25000"
    }
  }
];

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const selectedProduct = products.find(p => p.slug === productId);
    setProduct(selectedProduct);
  }, [productId]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const otherProducts = products.filter(p => p.id !== product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      
      <Helmet>
        <title>{product.metaInfo.title}</title>
        <meta name="description" content={product.metaInfo.description} />
        <link rel="canonical" href={product.metaInfo.canonical} />
        <meta name="keywords" content={`DLVB IMPEX, ${product.name}, ${product.name.toLowerCase()}, advanced healthcare, ${product.slug}`} />
        <meta property="og:title" content={product.metaInfo.title} />
        <meta property="og:description" content={product.metaInfo.description} />
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-gray-600 mb-8 mt-28">
          <Link to="/products" className="hover:text-gray-800">Products</Link>
          <ChevronRight className="mx-2 w-4 h-4" />
          <span className="font-semibold">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white p-8">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.altText} 
              className="w-full h-full object-contain" 
              loading="lazy" 
            />
            
            {/* Image Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index 
                      ? "bg-gray-800" 
                      : "bg-gray-300"
                  }`}
                  aria-label={`View image ${index + 1} of ${product.images.length}`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-600">{product.longDescription}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Important Information
              </h2>
              <p className="text-gray-600 italic">{product.disclaimer}</p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Medical Supervision Required</h3>
              <p className="text-blue-700">This product should only be used under proper medical supervision. Please consult with a healthcare professional before use.</p>
            </div>
          </div>
        </div>

        {/* Other Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Other Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {otherProducts.map((otherProduct) => (
              <Link 
                to={`/product/${otherProduct.slug}`}
                key={otherProduct.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-square bg-white p-4 flex items-center justify-center">
                  <img 
                    src={otherProduct.images[0]} 
                    alt={otherProduct.altText} 
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
      </div>
    </div>
  );
};

export default ProductDetailsPage;