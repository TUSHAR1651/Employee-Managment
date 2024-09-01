import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactModal from 'react-modal';

const Employee = () => {
  useEffect(() => {
    EmployeeList();
  }, []);

  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    email: '',
    salary: '',
    address: '',
    category_id: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const popUp = (id) => {
    setEmployee({
      id : id,
      name: '',
      email: '',
      salary: '',
      address: '',
      category_id: '',
    });
    setIsOpen(true);

  };
  const handleEdit = async (id) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/update_employee', employee);
      if (response.data.message === "Employee updated successfully!") {
        alert(response.data.message);
        EmployeeList();
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error updating the employee!", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/auth/delete_employee/${id}`);
      if (response.data.message === "Employee deleted successfully!") {
        alert(response.data.message);
        EmployeeList();
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error deleting the employee!", error);
    }
  };

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
                  <td className="py-3 px-4 text-gray-700">{employee.category}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button onClick={() => popUp(employee.id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200">Edit</button>
                    <button onClick={() => handleDelete(employee.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="w-full max-w-lg mx-auto bg-white rounded-lg border border-gray-300 shadow-lg p-6 relative"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Employee</h2>
          <form onSubmit={handleEdit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                  value={employee.name}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                  value={employee.email}
                  required
                />
              </div>
              <div>
                <label htmlFor="salary" className="block text-gray-700 text-sm font-medium mb-2">Salary</label>
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                  value={employee.salary}
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                  value={employee.address}
                  required
                />
              </div>
              <div>
                <label htmlFor="category_id" className="block text-gray-700 text-sm font-medium mb-2">Category ID</label>
                <input
                  type="text"
                  name="category_id"
                  id="category_id"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                  onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
                  value={employee.category_id}
                  required
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white p-3 rounded-md shadow-md hover:bg-teal-600 transition duration-200"
                >
                  Update Employee
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-red-500 text-white p-3 rounded-md shadow-md hover:bg-red-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </ReactModal>
      </div>
    </div>
  );
};

export default Employee;
