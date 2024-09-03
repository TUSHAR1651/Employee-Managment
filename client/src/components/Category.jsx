import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/auth//*  */delete_category/${id}`);
      if (response.data.message === "Category deleted successfully!") {
        alert(response.data.message);
        getCategories();
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error deleting the category!", error);
    }
  };

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
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-gray-300 shadow-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-extrabold text-gray-900">Category List</h3>
        </div>
        <Link
          to="/dashBoard/add_category"
          className="block w-full text-center px-6 py-4 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
        >
          Add New Category
        </Link>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full bg-white border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Category</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{category.name}</td>
                    <td className='text-right'> <button onClick={() => deleteCategory(category.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded t">Delete</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="1" className="px-6 py-4 text-center text-gray-600">No categories found</td>
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
