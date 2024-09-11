import React, { useState, useEffect } from 'react';
import './App.css';  
import CustomerAddUpdateForm from './CustomerAddUpdateForm.js';
import CustomerList from './CustomerList.js';
import { getAll, post, put, deleteById } from './restdb'; // Import the new restdb functions

function App() {
  // State to hold customer data
  const [customers, setCustomers] = useState([]);

  // Retrieve customers from the database using getAll from restdb.js
  const getCustomers = function () {
    console.log("Fetching customers...");
    getAll(setCustomers);//Fetches customers from API
  };

  // Fetch customers on component mount and whenever formData changes
  useEffect(() => {
    getCustomers();
  }, []);

  // State for form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // State for selected customer
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Define a blank customer for resetting the form
  const blankCustomer = { name: '', email: '', password: '' };

  // Mode for adding or updating customer data
  const mode = selectedCustomer ? "Update" : "Add";

  // Handle customer delete
  const handleDelete = () => {
    console.log('Delete button clicked');
    const postOpCallback = () => {
      setFormData(blankCustomer); // Reset the form after deletion
      setSelectedCustomer(null); // Deselect customer
      getCustomers(); // Refresh the customer list
    };
    if (selectedCustomer && selectedCustomer.id >= 0) {
      deleteById(selectedCustomer.id, postOpCallback);
    } else {
      setFormData(blankCustomer);
    }
  };

  // Handle customer save (add or update)
  const handleSave = () => {
    console.log('Save button clicked');
    const postOpCallback = () => {
      setFormData(blankCustomer); // Reset the form after save
      setSelectedCustomer(null); // Deselect customer
      getCustomers(); // Refresh the customer list
    };
    if (mode === 'Add') {
      // Validate input fields
      if (!formData.name || !formData.email || !formData.password) {
        console.log('All input fields must be filled');
        return;
      }
      post(formData, postOpCallback); // Add a new customer
    } else if (mode === 'Update' && selectedCustomer) {
      put(selectedCustomer.id, formData, postOpCallback); // Update an existing customer
    }
  };

  // Handle form cancel/reset
  const handleCancel = () => {
    setSelectedCustomer(null); // Deselect customer
    setFormData(blankCustomer); // Reset the form
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle customer selection from the list
  const handleCustomerClick = (customer) => {
    if (selectedCustomer && selectedCustomer.id === customer.id) {
      setSelectedCustomer(null); // Deselect the customer
      setFormData(blankCustomer); // Reset the form
    } else {
      setSelectedCustomer(customer); // Select the customer
      setFormData({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        password: customer.password
      });
    }
  };

  return (
    <div>
      <h1>Customer Management</h1>

      <div className="table-section">
        <CustomerList 
          customers={customers}
          selectedCustomer={selectedCustomer}
          handleCustomerClick={handleCustomerClick}
        />
      </div>

      <div className="form-section">
        <CustomerAddUpdateForm
          mode={mode}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default App;