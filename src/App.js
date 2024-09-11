import React, { useState, useEffect } from 'react';
import './App.css';  
import CustomerAddUpdateForm from './CustomerAddUpdateForm';
import CustomerList from './CustomerList';
import { getAll, deleteById, post, put } from './memdb';

function App() {
  //Sets to empty array
  const [customers, setCustomers] = useState([]);
  //Default values for form data
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  //Sets to null use state for selected customer
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  //Defines blank customer with empty values
  const blankCustomer = { name: '', email: '', password: '' };
  //Defines mode depending on if a customer has been selected
  const mode = selectedCustomer ? "Update" : "Add";

  //Uses customer data from memdb.js
  const getCustomers = () => {
    const customerData = getAll();
    setCustomers(customerData);
  };
  useEffect(() => {
    getCustomers();
  }, []);

  //Delete function
  const handleDelete = () => {
    if (!selectedCustomer) {
      console.log('Error. No customer was selected');
      return;
    }
    deleteById(selectedCustomer.id);
    setFormData(blankCustomer);
    setSelectedCustomer(null);
    getCustomers();
  };

  //Save function
  const handleSave = () => {
    if (mode === 'Add') {
      if (!formData.name || !formData.email || !formData.password) {
        console.log('All input fields must be filled');
        return;
      }
      post(formData);
    } else if (mode === 'Update' && selectedCustomer) {
      put(selectedCustomer.id, formData);
    }
    setFormData(blankCustomer);
    setSelectedCustomer(null);
    getCustomers();
  };

  //Cancel function
  const handleCancel = () => {
    setSelectedCustomer(null);
    setFormData(blankCustomer);
  };

  //Click function
  const handleCustomerClick = (customer) => {
    if (selectedCustomer && selectedCustomer.id === customer.id) {
      setSelectedCustomer(null);
      setFormData(blankCustomer);
    } else {
      setSelectedCustomer(customer);
      setFormData(customer);
    }
  };

  //Input functionality
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //UI Return page
  return (
    <div>
      <h1>Customer Management</h1>
      <CustomerList
        customers={customers}
        selectedCustomer={selectedCustomer}
        handleCustomerClick={handleCustomerClick}
      />
      <CustomerAddUpdateForm
        mode={mode}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;