import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
  useEffect(() => {
    EmployeeList();
  }, []);

  const [employees, setEmployees] = useState([]);

  const EmployeeList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/employees');
      if (response.data.message === "Employees fetched successfully!") {
        console.log(response.data.employees);
        setEmployees(response.data.employees);
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error fetching the employees!", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg border border-gray-300 shadow-lg p-6">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800">Employee List</h3>
        </div>
        <Link
          to="/dashBoard/add_employee"
          className="block w-full text-center px-6 py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-300 mb-6"
        >
          Add New Employee
        </Link>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700 border-b border-gray-300">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Salary</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{employee.id}</td>
                  <td className="py-3 px-4 text-gray-700">{employee.name}</td>
                  <td className="py-3 px-4 text-gray-700">{employee.email}</td>
                  <td className="py-3 px-4 text-gray-700">{employee.salary}</td>
                  <td className="py-3 px-4 text-gray-700">{employee.address}</td>
                  <td className="py-3 px-4 text-gray-700">{employee.category_id}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200">Edit</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
