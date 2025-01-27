import React from 'react';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6">
            <div className="text-center max-w-2xl mx-auto">
                {/* Large 404 Number */}
                <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>

                {/* Decorative Line */}
                <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>

                {/* Main Message */}
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                    Page Not Found
                </h2>

                {/* Descriptive Text */}
                <p className="text-gray-600 text-lg mb-8">
                    We're sorry, but the page you're looking for doesn't exist or has been moved.
                </p>

                {/* DLVB Implex Logo Placeholder */}
                <div className="mb-8">
                    <div className="text-2xl font-bold text-blue-600">
                        DLVB IMPLEX
                    </div>
                </div>

                {/* Back to Home Button */}
                <button
                    onClick={() => window.location.href = '/'}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg 
                   transition-all duration-200 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Homepage
                </button>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                    <div className="w-64 h-64 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;