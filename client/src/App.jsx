import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Login from './login/Login.jsx';
import Register from './register/Register.jsx';
import BusDash from "./dashboard/BusDash.jsx";
import CustomerDash from "./dashboard/CustomerDash.jsx";
import BusinessDashboard from './businessdashboard/BusinessDashboard.jsx'
import CustomerList from "./customerlist/CustomerList.jsx";

function App() {
  return (
    <div className='App'>
        <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/business/:businessName" element={<BusDash />} />
              <Route path="/customer/:customerName" element={<CustomerDash />} />
              <Route path="/businessdashboard" element = {<BusinessDashboard/>}/>
              <Route path="/customerlist" element = {<CustomerList/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
