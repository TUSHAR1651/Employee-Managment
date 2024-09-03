import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        category_id: '',
        address: '',
    });

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/categories');
            if (response.data.message === "Categories fetched successfully!") {
                setCategories(response.data.categories);
                console.log(response.data.categories);
            } else {
                console.log(response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error("There was an error fetching the categories!", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(employee);
        try {
            axios.post('http://localhost:8000/auth/register', employee).then((response) => {
                if (response.data.message === "Employee added successfully!") {
                    alert(response.data.message);
                } else {
                    alert(response.data.error);
                }
            });

        }
        catch (error) {
            console.error("There was an error adding the employee!", error);
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-lg border border-gray-300 shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Add New Employee
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                            value={employee.name}
                        />
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                            value={employee.email}
                        />
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                            value={employee.password}
                        />
                        <label htmlFor="salary" className="block text-gray-700 text-sm font-medium mb-2">
                            Salary
                        </label>
                        <input
                            type="text"
                            name="salary"
                            id="salary"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                            value={employee.salary}
                        />

                        <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            value={selectedCategory.id}
                            onChange={(e) => {
                                setEmployee({ ...employee, category_id: e.target.value });
                                setSelectedCategory(e.target.value);
                            }}
                            
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                            value={employee.address}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-600 transition duration-300"
                    >
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
