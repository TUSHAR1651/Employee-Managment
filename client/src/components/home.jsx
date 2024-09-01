import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';

function Home() {
  const [employees, setEmployees] = useState(0);
  const [categories, setCategories] = useState(0);
  const [admin, setAdmin] = useState(0);
  const employeeList = async () => {
    axios.get('http://localhost:8000/auth/employee_count')
      .then((response) => {
        setEmployees(response.data.employees[0]);
      });
  };
  const categoryList = async () => {
    axios.get('http://localhost:8000/auth/category_count')
      .then((response) => {
        console.log(response.data.categories[0]);
        setCategories(response.data.categories[0]);
      });
    
  };
  const adminList = async () => {
    axios.get('http://localhost:8000/auth/admin_count')
      .then((response) => {
        setAdmin(response.data.admin[0]); 
      });
  };
  useEffect(() => {
    employeeList();
    categoryList();
    adminList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-2xl font-bold text-gray-800 mb-6">
          Home
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
            <span className="font-semibold text-gray-700">Admin Count:</span>
            <span className="text-gray-900">{admin.Count}</span>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <span className="font-semibold text-gray-700">Employee Count:</span>
            <span className="text-gray-900">{employees.Count}</span>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md flex align-middle  justify-space-between">
            <span className="font-semibold text-gray-700">Category Count:</span>
            <span className="text-gray-900">{categories.Count}</span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home;
