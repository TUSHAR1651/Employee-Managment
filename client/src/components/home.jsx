import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [employees, setEmployees] = useState({ Count: 0 });
  const [categories, setCategories] = useState({ Count: 0 });
  const [admin, setAdmin] = useState({ Count: 0 });
  const [admins, setAdmins] = useState([]);

  const fetchEmployeeCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/employee_count');
      setEmployees(response.data.employees[0] || { Count: 0 });
    } catch (error) {
      console.error("Error fetching employee count:", error);
    }
  };

  const fetchCategoryCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/category_count');
      setCategories(response.data.categories[0] || { Count: 0 });
    } catch (error) {
      console.error("Error fetching category count:", error);
    }
  };

  const fetchAdminCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/admin_count');
      setAdmin(response.data.admin[0] || { Count: 0 });
    } catch (error) {
      console.error("Error fetching admin count:", error);
    }
  };

  const fetchAdminsList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/admins');
      setAdmins(response.data.admins || []);
    } catch (error) {
      console.error("Error fetching admins list:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeCount();
    fetchCategoryCount();
    fetchAdminCount();
    fetchAdminsList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Dashboard
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 border border-blue-300 p-6 rounded-lg shadow-sm flex items-center justify-between">
            <span className="text-lg font-semibold text-blue-800">Admin Count:</span>
            <span className="text-2xl font-bold text-blue-900">{admin.Count}</span>
          </div>
          <div className="bg-green-100 border border-green-300 p-6 rounded-lg shadow-sm flex items-center justify-between">
            <span className="text-lg font-semibold text-green-800">Employee Count:</span>
            <span className="text-2xl font-bold text-green-900">{employees.Count}</span>
          </div>
          <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-lg shadow-sm flex items-center justify-between">
            <span className="text-lg font-semibold text-yellow-800">Category Count:</span>
            <span className="text-2xl font-bold text-yellow-900">{categories.Count}</span>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
        <div className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Admin List
        </div>
        <div className="bg-blue-100 border border-blue-300 p-6 rounded-lg shadow-sm">
          <span className="text-lg font-semibold text-blue-800">Admins</span>
        </div>
        <ol className="list-decimal list-inside mt-6 space-y-4">
          {admins.length > 0 ? (
            admins.map((admin) => (
              <li key={admin.id} className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
                <span className="text-lg font-medium text-blue-900">{admin.email}</span>
              </li>
            ))
          ) : (
            <li className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
              <span className="text-lg font-medium text-blue-900">No admins found</span>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Home;
