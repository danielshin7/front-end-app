import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CustomerAddUpdateForm from './CustomerAddUpdateForm.js';
import CustomerList from './CustomerList.js';
import { getAll, deleteById } from './restdb.js';
import * as restdb from './restdb.js';

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const blankCustomer = { name: '', email: '', password: '' };

  //Retrieves customer list
  const getCustomers = function () {
    getAll(setCustomers);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  // Handle save customer
  const handleSave = (formData, callback) => {
    if (selectedCustomer) {
      restdb.put(selectedCustomer.id, formData, () => {
        setSelectedCustomer(null);
        getCustomers(); // Refresh customer list
        callback();
      });
    } else {
      restdb.post(formData, () => {
        getCustomers(); // Refresh customer list
        callback();
      });
    }
  };

  // Handle delete customer
  const handleDelete = (callback) => {
    if (!selectedCustomer) return;
    deleteById(selectedCustomer.id, () => {
      setSelectedCustomer(null);
      getCustomers(); // Refresh customer list
      callback();
    });
  };

  return (
    <Router>
      <Routes>
        {/* Customer list page */}
        <Route
          path="/"
          element={
            <CustomerList
              customers={customers}
              setSelectedCustomer={setSelectedCustomer}
              selectedCustomer={selectedCustomer}
              blankCustomer={blankCustomer}
            />
          }
        />

        {/* Customer form page */}
        <Route
          path="/form"
          element={
            <CustomerAddUpdateForm
              selectedCustomer={selectedCustomer}
              blankCustomer={blankCustomer}
              handleSave={handleSave}
              handleDelete={handleDelete}
              setSelectedCustomer={setSelectedCustomer}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;