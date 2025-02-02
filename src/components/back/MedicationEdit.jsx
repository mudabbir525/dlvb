import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Save, Image } from 'lucide-react';

const BASE_URL = 'https://dlvbimpexpvtltd.com/backend';

const MedicationEdit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        long_description: '',
        disclaimer: '',
        alt_text: '',
        slug: '',
        meta_info_title: '',
        meta_info_description: '',
        meta_info_canonical: ''
    });

    const [image1Preview, setImage1Preview] = useState(null);
    const [image2Preview, setImage2Preview] = useState(null);
    const [files, setFiles] = useState({
        image1: null,
        image2: null
    });

    useEffect(() => {
        fetchMedication();
    }, [id]);

    const fetchMedication = async () => {
        try {
            const response = await fetch(`${BASE_URL}/update.php?id=${id}`);
            const data = await response.json();

            if (data.error) {
                alert('Error fetching medication');
                return;
            }

            setFormData({
                name: data.name,
                price: data.price,
                description: data.description,
                long_description: data.long_description,
                disclaimer: data.disclaimer,
                alt_text: data.alt_text,
                slug: data.slug,
                meta_info_title: data.meta_info_title,
                meta_info_description: data.meta_info_description,
                meta_info_canonical: data.meta_info_canonical
            });

            setImage1Preview(data.image_address1);
            setImage2Preview(data.image_address2);
        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching medication');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e, imageNum) => {
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({
                ...prev,
                [imageNum]: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                if (imageNum === 'image1') {
                    setImage1Preview(reader.result);
                } else {
                    setImage2Preview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        formDataToSend.append('id', id);
        if (files.image1) formDataToSend.append('image1', files.image1);
        if (files.image2) formDataToSend.append('image2', files.image2);

        try {
            const response = await fetch(`${BASE_URL}/update.php`, {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();
            if (data.success) {
                alert('Medication updated successfully!');
                window.location.href = '/';
            } else {
                alert(data.error || 'Error updating medication');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating medication');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Medication</h1>

            {/* Form JSX structure similar to MedicationForm but with a Save button instead of Add */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        rows="3"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Long Description</label>
                    <textarea
                        name="long_description"
                        value={formData.long_description}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        rows="5"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Disclaimer</label>
                    <textarea
                        name="disclaimer"
                        value={formData.disclaimer}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        rows="3"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Image 1</label>
                        <div className="border-2 border-dashed rounded-lg p-4">
                            <input
                                type="file"
                                onChange={(e) => handleImageChange(e, 'image1')}
                                className="hidden"
                                id="image1"
                                accept="image/*"
                                required
                            />
                            <label htmlFor="image1" className="cursor-pointer">
                                {image1Preview ? (
                                    <img src={image1Preview} alt="Preview" className="max-h-40 mx-auto" />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Image className="w-12 h-12 text-gray-400" />
                                        <span className="mt-2 text-sm text-gray-500">Click to upload image 1</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Image 2 (Optional)</label>
                        <div className="border-2 border-dashed rounded-lg p-4">
                            <input
                                type="file"
                                onChange={(e) => handleImageChange(e, 'image2')}
                                className="hidden"
                                id="image2"
                                accept="image/*"
                            />
                            <label htmlFor="image2" className="cursor-pointer">
                                {image2Preview ? (
                                    <img src={image2Preview} alt="Preview" className="max-h-40 mx-auto" />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Image className="w-12 h-12 text-gray-400" />
                                        <span className="mt-2 text-sm text-gray-500">Click to upload image 2</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Alt Text</label>
                    <input
                        type="text"
                        name="alt_text"
                        value={formData.alt_text}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Meta Information</h2>

                    <div>
                        <label className="block text-sm font-medium mb-2">Meta Title</label>
                        <input
                            type="text"
                            name="meta_info_title"
                            value={formData.meta_info_title}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Meta Description</label>
                        <textarea
                            name="meta_info_description"
                            value={formData.meta_info_description}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2"
                            rows="3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Canonical URL</label>
                        <input
                            type="text"
                            name="meta_info_canonical"
                            value={formData.meta_info_canonical}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default MedicationEdit;