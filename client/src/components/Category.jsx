import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/categories');
      if (response.data.message === "Categories fetched successfully!") {
        console.log(response.data.categories);
        setCategories(response.data.categories);
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-xl border border-gray-300 shadow-md p-6">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-semibold text-gray-800">Category List</h3>
        </div>
        <Link
          to="/dashBoard/add_category"
          className="block w-full text-center px-6 py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
        >
          Add New Category
        </Link>

        <div className="mt-8">
          <table className="w-full table-auto bg-white border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Category</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id} className="border-b border-gray-200">
                    <td className="px-4 py-2 text-gray-700">{category.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="1" className="px-4 py-2 text-center text-gray-500">No categories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Category;
