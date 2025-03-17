import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

const EditMedication = () => {
    const [medication, setMedication] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
        long_description: '',
        disclaimer: '',
        image_address1: '',
        image_address2: '',
        alt_text: '',
        slug: '',
        meta_info: {
            id: '',
            meta_info_title: '',
            meta_info_description: '',
            meta_info_canonical: ''
        }
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Get ID from URL
    const id = window.location.pathname.split('/').pop();

    // Function to decode HTML entities
    const decodeHTMLEntities = (text) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    };

    useEffect(() => {
        fetchMedicationData();
    }, []);

    const fetchMedicationData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://dlvbimpexpvtltd.com/backend/get_medication.php?id=${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success && data.medication) {
                // Decode HTML entities in the data
                const decodedMedication = {
                    ...data.medication,
                    disclaimer: decodeHTMLEntities(data.medication.disclaimer),
                    meta_info: {
                        ...data.meta_info
                    }
                };
                setMedication(decodedMedication);
            } else {
                throw new Error(data.message || 'Failed to fetch medication data');
            }
        } catch (error) {
            console.error('Error fetching medication:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('meta_info_')) {
            setMedication(prev => ({
                ...prev,
                meta_info: {
                    ...prev.meta_info,
                    [name.replace('meta_info_', '')]: value
                }
            }));
        } else {
            setMedication(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setError(null);
            setSuccessMessage('');

            const formData = new FormData();
            
            // Add medication data
            Object.keys(medication).forEach(key => {
                if (key !== 'meta_info') {
                    formData.append(key, medication[key]);
                }
            });
            
            // Add meta info fields
            Object.keys(medication.meta_info).forEach(key => {
                if (key !== 'id') {
                    formData.append(`meta_info_${key}`, medication.meta_info[key]);
                }
            });

            const response = await fetch('https://dlvbimpexpvtltd.com/backend/update_medication.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage('Medication updated successfully!');
                window.scrollTo(0, 0);
            } else {
                throw new Error(data.message || 'Failed to update medication');
            }
        } catch (error) {
            console.error('Error updating medication:', error);
            setError(error.message);
            window.scrollTo(0, 0);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Medications
                </button>
            </div>

            <h1 className="text-2xl font-bold mb-6">Edit Medication</h1>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <p className="text-green-700">{successMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ID
                        </label>
                        <input
                            type="text"
                            value={medication.id}
                            className="w-full px-3 py-2 border rounded-md bg-gray-100"
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={medication.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={medication.price}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={medication.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            rows="3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Long Description
                        </label>
                        <textarea
                            name="long_description"
                            value={medication.long_description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            rows="5"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Disclaimer
                        </label>
                        <textarea
                            name="disclaimer"
                            value={medication.disclaimer}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            rows="3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Address 1
                        </label>
                        <input
                            type="text"
                            name="image_address1"
                            value={medication.image_address1}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Address 2
                        </label>
                        <input
                            type="text"
                            name="image_address2"
                            value={medication.image_address2}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alt Text
                        </label>
                        <input
                            type="text"
                            name="alt_text"
                            value={medication.alt_text}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slug
                        </label>
                        <input
                            type="text"
                            name="slug"
                            value={medication.slug}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                </div>

                <div className="border-t pt-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">Meta Information</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Info ID
                            </label>
                            <input
                                type="text"
                                value={medication.meta_info.id}
                                className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                name="meta_info_title"
                                value={medication.meta_info.meta_info_title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                name="meta_info_description"
                                value={medication.meta_info.meta_info_description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md"
                                rows="3"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Canonical URL
                            </label>
                            <input
                                type="url"
                                name="meta_info_canonical"
                                value={medication.meta_info.meta_info_canonical}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditMedication;