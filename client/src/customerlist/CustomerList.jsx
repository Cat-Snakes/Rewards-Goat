import react from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomerList.css';
import Cookies from 'js-cookie';

const CustomerList = () => {
  const navigate = useNavigate();
  const username = Cookies.get('username');
  const [pastRewards, setPastRewards] = useState([]);
  const [currentCustomers, setCurrentCustomer] = useState([]);

  // const testCustomerList = [
  //   {
  //     id: 1,
  //     name: 'Chapman',
  //     phone: 111,
  //     num_of_visits: 1,
  //   },
  //   {
  //     id: 2,
  //     name: 'Yihe',
  //     phone: 222,
  //     num_of_visits: 2,
  //   },
  //   {
  //     id: 3,
  //     name: 'Rachel',
  //     phone: 333,
  //     num_of_visits: 3,
  //   },
  //   {
  //     id: 4,
  //     name: 'Vicky',
  //     phone: 444,
  //     num_of_visits: 4,
  //   },
  //   {
  //     id: 5,
  //     name: 'Katherine',
  //     phone: 555,
  //     num_of_visits: 5,
  //   },
  // ];

  const getCustomerList = async () => {
    const response = await fetch(
      `http://localhost:8082/api/bus/getCustomerList/${username}`
    );
    data = response.json();
    if (!response.ok) {
      console.error(response.statusText);
    } else {
      setCurrentCustomer(data);
    }
  };

  const viewPastRewards = async () => {
    // const response = await fetch(
    //   `http://localhost:8082/api/users/pastRewards${username}`
    // );
    // if (!response.ok) {
    //   throw new Error(`Login error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // console.log(data);
    console.log('STRETCH GOALS!!!!');
  };

  const dashboard = () => {
    navigate('/businessdashboard', { state: { username: username } });
  };

  return (
    <div>
      <div className='customerlist-containerone'>
        <h1>Customer List</h1>
        <button className='customerlist-dashboard ' onClick={() => dashboard()}>
          Dashboard
        </button>
      </div>

      <div className='customerlist-gridcontainer'>
        <div className='customerlist-header'>Customer Name</div>
        <div className='customerlist-header'>Phone Number</div>
        <div className='customerlist-header'>Stars</div>
        <div className='customerlist-header'>Redeemed Rewards</div>

        {currentCustomers.map((customer) => (
          <div key={customer.id} className='customerlist-row'>
            <div className='customerlist-item'>{customer.name}</div>
            <div className='customerlist-item'>{customer.phone}</div>
            <div className='customerlist-item'>{customer.num_of_visits}</div>
            <button
              onClick={() => {
                viewPastRewards();
              }}
            >
              View Past Rewards
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
