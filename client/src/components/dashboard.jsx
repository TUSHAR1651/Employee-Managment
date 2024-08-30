import React from 'react';
import { Link , Outlet } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-200">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white h-full p-6 shadow-lg">
                <h1 className="text-4xl font-extrabold mb-8 text-blue-400">
                    <Link to="/dashboard">CWC</Link>
                </h1>
                <ul className="space-y-6">
                    <li>
                        <Link
                            to="/dashboard"
                            className="flex items-center text-gray-300 hover:text-blue-300 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-700"
                        >
                            <i className="bi bi-house-door mr-3"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/employee"
                            className="flex items-center text-gray-300 hover:text-blue-300 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-700"
                        >
                            <i className="bi bi-person-badge mr-3"></i>
                            Manage Employees
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/category"
                            className="flex items-center text-gray-300 hover:text-blue-300 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-700"
                        >
                            <i className="bi bi-tags mr-3"></i>
                            Category
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/profile"
                            className="flex items-center text-gray-300 hover:text-blue-300 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-700"
                        >
                            <i className="bi bi-person mr-3"></i>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/logout"
                            className="flex items-center text-gray-300 hover:text-blue-300 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-700"
                        >
                            <i className="bi bi-box-arrow-right mr-3"></i>
                            Logout
                        </Link>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white p-8">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                    Employee Management System
                </h2>
                <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;
