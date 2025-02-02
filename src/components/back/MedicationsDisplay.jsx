import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const API_BASE_URL = 'https://dlvbimpexpvtltd.com/backend';
const UPLOADS_BASE_URL = 'https://dlvbimpexpvtltd.com/backend/uploads';

const MedicationsDisplay = () => {
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        fetchMedications();
    }, []);

    const fetchMedications = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get.php`);
            const data = await response.json();
            setMedications(data);
        } catch (error) {
            console.error('Error fetching medications:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this medication?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/delete.php?id=${id}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                if (data.success) {
                    fetchMedications();
                }
            } catch (error) {
                console.error('Error deleting medication:', error);
            }
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        // Extract just the filename from the path
        const filename = imagePath.split('/').pop();
        return `${UPLOADS_BASE_URL}/${filename}`;
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Medications List</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medications.map((medication) => (
                    <div
                        key={medication.id}
                        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="relative h-52 bg-gray-100">
                            <img
                                src={getImageUrl(medication.image_address1)}
                                alt={medication.alt_text}
                                className="w-full h-full object-fill"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    onClick={() => window.location.href = `/edit/${medication.id}`}
                                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                                >
                                    <Pencil className="w-4 h-4 text-blue-500" />
                                </button>
                                <button
                                    onClick={() => handleDelete(medication.id)}
                                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{medication.name}</h2>
                            <p className="text-green-600 font-bold mb-2">
                                ₹{parseFloat(medication.price).toFixed(2)}
                            </p>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {medication.description}
                            </p>

                            <div className="space-y-2">
                                <div className="text-sm">
                                    <span className="font-medium">Slug: </span>
                                    <span className="text-gray-600">{medication.slug}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-medium">Meta Title: </span>
                                    <span className="text-gray-600">{medication.meta_info_title}</span>
                                </div>
                            </div>

                            {/* {medication.image_address2 && (
                                <div className="mt-4">
                                    <span className="text-sm font-medium">Additional Image:</span>
                                    <img
                                        src={getImageUrl(medication.image_address2)}
                                        alt={`Additional view of ${medication.alt_text}`}
                                        className="mt-2 w-full h-32 object-cover rounded"
                                    />
                                </div>
                            )} */}
                        </div>
                    </div>
                ))}
            </div>

            {medications.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No medications found</p>
                </div>
            )}
        </div>
    );
};

export default MedicationsDisplay;