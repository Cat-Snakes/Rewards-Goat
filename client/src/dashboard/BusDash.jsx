//imports
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BusHeader from './BusHeader';
import BusAddCustomer from './BusAddCustomer';
import BusCustomerList from './BusCustomerList';
import BusManageRewards from './BusManageRewards';
import './BusStyles.css'

//http://localhost:8082/api/users/login

const BusDash = () => {
  //test customer list
  // THIS WAS HARDCODED BEFORE WE WROTE CODE TO CALL BACKEND TO GET LIST OF CUSTOMERS
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
  //states

  const { businessName } = useParams(); // Fetches the business name from the url (i.e. localhost:3000/business/:businessName)
  
  const [companyName] = useState(businessName);
  const [newCustomer, setNewCustomer] = useState({ phone: '', name: '' });
  // const [customers, setCustomers] = useState(testCustomerList);
  const [customers, setCustomers] = useState([]); // Initial customers to empty list


  async function getCustomerList() {
    try {
      console.log('IS THIS THE PROBLEM')
      fetch(`http://localhost:8082/api/bus/busDashboard?businessName=${companyName}`, {credentials: 'include'})
      .then(response=>{
        if (!response){
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('response: ', response);
        return response.json();
        })
        .then(data => {
          console.log("data,", data);
          setCustomers(data)}
  );

//Old version -- async errors?
        // const response = await fetch(`http://localhost:8082/api/bus/busDashboard?businessName=${companyName}`, {credentials: 'include'});
        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // const result = await response.json();
        // setCustomers(result);
        // console.log(result);
    } catch (err) {
        alert("Error fetching customers from backend.");
    }
  }

  useEffect(() => {
    getCustomerList();
  }, []);

  const addCustomer = async () => {
    // This was previously adding a new customer to the dummy customer list
    // if (!newCustomer.phone.trim()) return;

    // const customer = {
    //   id: newCustomer.id,
    //   phone: newCustomer.phone,
    //   name: newCustomer.name,
    //   num_of_visits: 1,
    // };
    // setCustomers([...customers, customer]);
    // setNewCustomer({ phone: '' });
    console.log('ADD CUSTOMER FUNCTION ON BUTTON')
    const requestBody = {
      name: newCustomer.name,
      phone: newCustomer.phone,
      business_name: companyName
    }

    try {
      const response = await fetch("http://localhost:8082/api/bus/addCustomer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
    });

    if(!response) {
      throw new Error("Network response was not ok (addCustomer)");
    }

    getCustomerList();
    } catch (error) {
      console.error("Error submitting customer:", error);
    }
  };

  const updateVisits = async (phone, amount) => { // RENAMED ADDEND TO AMOUNT and CHANGED ID TO PHONE
    // This previously was used to mock the functionality on the hard coded customer list
    // setCustomers(
    //   customers.map((customer) => {
    //     if (customer.id === id) {
    //       return {
    //         ...customer,
    //         num_of_visits: customer.num_of_visits + addend,
    //       };
    //     }
    //     return customer;
    //   })
    // );

    // Update num visits by making call to backend

      const requestBody = {
        amount: amount,
        phone: phone,
        business_name: companyName
      }

      try {
        const response = await fetch("http://localhost:8082/api/bus/addStar", {
            method: "POST",
            // mode: "no-cors", // Mysterious cors error- add this next time you get one and it fixes yayyy
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        });

        if (!response) {
            throw new Error("Network response was not ok (updateVisits)");
        }

        // const result = await response.json();
        // console.log(response);
        getCustomerList();
    } catch (error) {
        console.error("Error submitting visits:", error);
        // setResponseMessage("Submission failed.");
    }
  };

  return (
    <div className='dashboard'>
      <BusHeader companyName={companyName} />
      <BusAddCustomer
        newCustomer={newCustomer}
        setNewCustomer={setNewCustomer}
        addCustomer={addCustomer}
      />
      <BusCustomerList customers={customers} updateVisits={updateVisits} />
      <BusManageRewards />
    </div>
  );
};

export default BusDash;
