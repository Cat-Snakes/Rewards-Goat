import react from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomerList.css';

const CustomerList = () => {

    const testCustomerList = [
    {
      id: 1,
      name: 'Chapman',
      phone: 111,
      num_of_visits: 1,
    },
    {
      id: 2,
      name: 'Yihe',
      phone: 222,
      num_of_visits: 2,
    },
    {
      id: 3,
      name: 'Rachel',
      phone: 333,
      num_of_visits: 3,
    },
    {
      id: 4,
      name: 'Vicky',
      phone: 444,
      num_of_visits: 4,
    },
    {
      id: 5,
      name: 'Katherine',
      phone: 555,
      num_of_visits: 5,
    },
  ];

    const dashboard = () => {
        // navigate("/businessdashboard", { state: { username: username } });
      };

  return (
    <div>
      <div className='customerlist-containerone'>
        <h1>Customer List</h1>
        <button
          onClick={() => {
            dashboard();
          }}
        >
          Dashboard
        </button>
      </div>
      <div>
        {testCustomerList.map((customer,index)=>{
            
        })}

      </div>
    </div>
  );
};

export default CustomerList;
