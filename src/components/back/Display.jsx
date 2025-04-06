import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const API_BASE_URL = 'https://dlvbimpexpvtltd.com/backend';
const UPLOADS_BASE_URL = 'https://dlvbimpexpvtltd.com/backend/uploads';

// Main component
const MedicationsDisplay = () => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMedications();
    }, []);

    const fetchMedications = async () => {
        try {
            setLoading(true);
            // Using the original endpoint name since changing it may have caused the 404 error
            // We'll use a more robust error handling approach
            const response = await fetch(`${API_BASE_URL}/fuck.php?timestamp=${new Date().getTime()}`);
            
            // Check for non-JSON responses
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response. Please check the API endpoint.');
            }
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Handle the API response structure
            const medicationsArray = result.data || [];
            
            if (!Array.isArray(medicationsArray)) {
                throw new Error('Invalid data format: expected an array');
            }

            // Sort medications by ID in ascending order
            const sortedMedications = medicationsArray.sort((a, b) => {
                const idA = parseInt(a.id, 10);
                const idB = parseInt(b.id, 10);
                return idA - idB;
            });

            setMedications(sortedMedications);
            
            // Log debug info if available
            if (result.debug) {
                console.log('Debug info:', result.debug);
            }
        } catch (error) {
            console.error('Error fetching medications:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            alert('Invalid medication ID');
            return;
        }
        
        if (window.confirm('Are you sure you want to delete this medication?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/delete.php?id=${id}`, {
                    method: 'DELETE'
                });
                
                // Check for non-JSON responses
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Server returned non-JSON response');
                }
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                if (data.success) {
                    // Refresh the medications list
                    fetchMedications();
                    alert('Medication deleted successfully');
                } else {
                    throw new Error(data.message || 'Failed to delete medication');
                }
            } catch (error) {
                console.error('Error deleting medication:', error);
                alert('Failed to delete medication: ' + error.message);
            }
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return 'https://via.placeholder.com/400x300?text=No+Image';
        const filename = imagePath.split('/').pop();
        return `${UPLOADS_BASE_URL}/${filename}`;
    };

    // Loading state
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-xl text-gray-600 animate-pulse">Loading medications...</div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="text-xl text-red-600 mb-4">Error: {error}</div>
                    <button
                        onClick={fetchMedications}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Medications List</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Showing {medications.length} items (sorted by ID)
                    </p>
                </div>
                <button
                    onClick={() => window.location.href = '/siddesh'}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Add New Medication
                </button>
            </div>

            {medications.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">No medications found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {medications.map((medication) => (
                        <div
                            key={medication.id || Math.random().toString()}
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="relative h-52 bg-gray-100">
                                <img
                                    src={getImageUrl(medication.image_address1)}
                                    alt={medication.alt_text || medication.name || "Medication image"}
                                    className="w-full h-full object-contain p-2"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                    }}
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => window.location.href = `/edit/${medication.id}`}
                                        className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                                        title="Edit medication"
                                    >
                                        <Pencil className="w-4 h-4 text-blue-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(medication.id)}
                                        className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                                        title="Delete medication"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{medication.name || "Unknown Medication"}</h2>
                                <p className="text-green-600 font-bold mb-2">
                                    ₹{parseFloat(medication.price || 0).toFixed(2)}
                                </p>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {medication.description || 'No description available'}
                                </p>

                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium">Slug: </span>
                                        <span className="text-gray-600">{medication.slug || 'Not set'}</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Meta Title: </span>
                                        <span className="text-gray-600">{medication.meta_info_title || 'Not set'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MedicationsDisplay;