import React, { useState, useEffect } from 'react';
import './App.css';
import { getAll, deleteById} from './memdb.js';
import * as memdb from './memdb.js';

function App() {
  // Array containing customer data 
  const [customers, setCustomers] = useState([]);

  //getCustomers to retrieve from memdb.js
  const getCustomers = function(){
    console.log("in getCustomers()");
    const customerData = getAll();
    setCustomers(customerData);
  }

  //useEffect to call getCustomers to fill array with data from memdb.js
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

  //Mode for adding or updating customer data
  const mode = selectedCustomer ? "Update" : "Add";

  // Function stubs
  const handleDelete = () => {
    console.log('Delete button clicked');
    if (!selectedCustomer){
      console.log('Error. No customer was selected')
      return;
    }
    deleteById(selectedCustomer.id);
    setFormData(blankCustomer);
  };

  const handleSave = () => {
    console.log('Save button clicked');
    if (mode == 'Add'){
      if(!formData.name || !formData.email || !formData.password){
        console.log('All input fields must be filled');
        return;
      }
      memdb.post({
        name:formData.name,
        email:formData.email,
        password:formData.password
      });
    }
    else if (mode == 'Update') {
      if (!selectedCustomer) {
        console.log('Error. No customer was selected');
        return;
      }
      memdb.put(selectedCustomer.id, {
        name:formData.name,
        email: formData.email,
        password: formData.password
      });
    }

    setFormData(blankCustomer);
    setSelectedCustomer(null);
  };

  const handleCancel = () => {
    setSelectedCustomer(null);
    setFormData(blankCustomer);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCustomerClick = (customer) => {
    if (selectedCustomer && selectedCustomer.id === customer.id) {
      setSelectedCustomer(null);
      setFormData(blankCustomer);
    } else {
      setSelectedCustomer(customer);
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr
                key={customer.id}
                onClick={() => handleCustomerClick(customer)}
                className={selectedCustomer && selectedCustomer.id === customer.id ? 'selected' : ''}
              >
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-section">
        <h2>{mode} Customer</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <div className="form-buttons">
            <button type="button" onClick={handleDelete}>Delete</button>
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;