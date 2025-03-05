import react from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BusinessDashboard.css';

const BusinessDashboard = () => {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const data = location.state;
  //   const { username } = data;

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const logout = () => {
    // navigate("/", { state: { username: username } });
  };

  const customerNameInput = (e) => {
    setCustomerName(e.target.value);
  };

  const phoneNumberInput = (e) => {
    setPhoneNumber(e.target.value);
  };

  const addNewCustomer = () => {
    // navigate("/", { state: { username: username, customerName: customerName, phoneNumber: phoneNumber } });
  };

  const listOfCurrentCustomers = () => {
    // navigate("/", { state: { username: username } });
  };

  const viewCurrentRewards = () => {
    // navigate("/", { state: { username: username } });
  };

  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout!
      </button>
      <div>
        <h1>Welcome Business!</h1>
        <h2>Enroll a customer</h2>
        <div className='businessdash-containerone'>
          <div className='businessdash-containertwo'>
            <h4>Customer Name:</h4>
            <input
              className='businessdash-inputs'
              type='text'
              placeholder='Enter Customer Name Here'
              onChange={customerNameInput}
            />
          </div>
          <div className='businessdash-containertwo'>
            <h4>Phone number:</h4>
            <input
              className='businessdash-inputs'
              type='text'
              placeholder='Enter Client Phone Number Here'
              onChange={phoneNumberInput}
            />
          </div>
          <button
            className='businessdash-buttons'
            onClick={() => {
              addNewCustomer();
            }}
          >
            Add New Customer!
          </button>
          <button
            className='businessdash-buttons'
            onClick={() => {
              listOfCurrentCustomers();
            }}
          >
            List Of Current Customers
          </button>
          <button
            className='businessdash-buttons'
            onClick={() => {
              viewCurrentRewards();
            }}
          >
            View Current Rewards
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
