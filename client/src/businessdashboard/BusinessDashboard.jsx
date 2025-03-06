import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BusinessDashboard.css';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};
  const { username } = data;

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const logout = () => {
    navigate('/');
  };

  const customerNameInput = (e) => {
    setCustomerName(e.target.value);
  };

  const phoneNumberInput = (e) => {
    setPhoneNumber(e.target.value);
  };

  const emailAddressInput = (e) => {
    setEmailAddress(e.target.value);
  };

  const addNewCustomer = async () => {
    const response = await fetch('http://localhost:8082/api/bus/addCustomer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: customerName,
        phone: phoneNumber,
        email: emailAddress,
        user_type: 'customer',
      }),
    });
    if (!response.ok){
      console.error(response.statusText)
    }
    else{
      alert('The user has been added to the database')
    }
  };

  const listOfCurrentCustomers = () => {
    navigate('/customerlist', { state: { username: username } });
  };

  const viewCurrentRewards = () => {
    navigate('/businessrewards', { state: { username: username } });
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
          <div className='businessdash-containertwo'>
            <h4>Email Address:</h4>
            <input
              className='businessdash-inputs'
              type='text'
              placeholder='Enter Client Email Address Here'
              onChange={emailAddressInput}
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
