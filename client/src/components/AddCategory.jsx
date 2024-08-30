import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddCategory = () => {
    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/auth/add_category", { category })
            .then((res) => {
                if (res.data.message === "Category added successfully!") {
                    navigate('/dashboard/category');
                }
                else {
                    alert(res.data.message);
                }
                
            })
            .catch((error) => {
                console.error('Error adding category:', error);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-lg border border-gray-300 shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Add New Category
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            value={category}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-600 transition duration-300"
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
