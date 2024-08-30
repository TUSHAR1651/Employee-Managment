import './App.css';
import "./index.css";
import Login from './components/login';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Employee from './components/employee';
import Category from './components/Category';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './components/Profile';
import AddCategory from './components/AddCategory';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}>
            {" "}
          </Route>
          <Route path="/dashboard/employee" element={<Employee />}>
            {" "}
          </Route>
          <Route path="/dashboard/category" element={<Category />}>
            {" "}
          </Route>
          <Route path="/dashboard/profile" element={<Profile />}>
            {" "}
          </Route>
          <Route path="/dashboard/add_category" element={<AddCategory />}>
            {" "}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
