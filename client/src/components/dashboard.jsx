import React from 'react';
import { Link , Outlet } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; 



const Dashboard = () => {
    const LogOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/adminLogin';
    }
    
    return (
        <div className="flex h-screen bg-gray-200">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white h-full p-6 shadow-lg fixed">
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
                            to="/adminLogin"
                            className="flex items-center text-gray-300 hover:text-blue-300 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-700"
                        >
                            <i className="bi bi-box-arrow-right mr-3"></i>
                            <button onClick={LogOut}>Logout</button>
                        </Link>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className="ml-64 w-full">
                <div className="bg-gray-800 text-white p-6 shadow-lg fixed w-full">
                    <h1 className="text-2xl font-bold mb-4">Employee Managment System</h1>
                </div>
                <div className='mt-24'>
                    <Outlet />
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
