import './App.css';
import "./index.css";
import Login from './components/login';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Employee from './components/employee';
import Category from './components/Category';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCategory from './components/AddCategory';
import AddEmployee from './components/AddEmployee';
import ProtectedRoute from './components/ProtectedRoute';
import { useRef } from 'react';

function App() {

  const isAuthenticated = useRef(true);

  console.log(isAuthenticated.current);
  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/adminLogin" element={<Login />}></Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={ <Dashboard /> }>
                <Route path="" element={<Home />}>
                  {" "}
                </Route>
                <Route path="/dashboard/employee" element={<Employee />}>
                  {" "}
                </Route>
                <Route path="/dashboard/category" element={<Category />}>
                  {" "}
                </Route>
                <Route path="/dashboard/add_category" element={<AddCategory />}>
                  {" "}
                </Route>
                <Route path="/dashboard/add_employee" element={<AddEmployee />}>
                  {" "}
                </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
