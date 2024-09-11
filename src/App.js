import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerAddUpdateForm from './CustomerAddUpdateForm.js';
import CustomerList from './CustomerList.js';
import { getAll, deleteById } from './restdb.js';
import * as restdb from './restdb.js';

function App() {
  // Array containing customer data
  const [customers, setCustomers] = useState([]);
  
  // State for form
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // State for selected customer
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Define a blank customer for resetting the form
  const blankCustomer = { name: '', email: '', password: '' };

  // Mode for adding or updating customer data
  const mode = selectedCustomer ? 'Update' : 'Add';

  // State for pagination and search
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;

  // Get customers from restdb.js
  const getCustomers = function () {
    console.log('in getCustomers()');
    getAll(setCustomers);
  };

  // UseEffect to call getCustomers to fill array with data from restdb.js
  useEffect(() => {
    getCustomers();
  }, []);

  // Handle delete customer
  const handleDelete = () => {
    console.log('Delete button clicked');
    if (!selectedCustomer) {
      console.log('Error. No customer was selected');
      return;
    }
    deleteById(selectedCustomer.id, () => {
      setFormData(blankCustomer);
      setSelectedCustomer(null);
      getCustomers(); // Refresh customer list
    });
  };

  // Handle save customer
  const handleSave = () => {
    console.log('Save button clicked');
    if (mode === 'Add') {
      if (!formData.name || !formData.email || !formData.password) {
        console.log('All input fields must be filled');
        return;
      }
      restdb.post(formData, () => {
        setFormData(blankCustomer);
        getCustomers(); // Refresh customer list
      });
    } else if (mode === 'Update') {
      if (!selectedCustomer) {
        console.log('Error. No customer was selected');
        return;
      }
      restdb.put(selectedCustomer.id, formData, () => {
        setFormData(blankCustomer);
        setSelectedCustomer(null);
        getCustomers(); // Refresh customer list
      });
    }
  };

  const handleCancel = () => {
    setSelectedCustomer(null);
    setFormData(blankCustomer);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        password: customer.password,
      });
    }
  };

  // Handle page navigation
  const handlePageUp = () => {
    if ((currentPage + 1) * pageSize < filteredCustomers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageDown = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current page customers
  const pagedCustomers = filteredCustomers.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div>
      <h1>Customer Management</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0); // Reset to first page on new search
          }}
        />
      </div>
      <p>Total records: {filteredCustomers.length}</p>
      <div className="table-section">
        <div style={{ height: '300px', overflowY: 'scroll' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {pagedCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => handleCustomerClick(customer)}
                  className={
                    selectedCustomer && selectedCustomer.id === customer.id
                      ? 'selected'
                      : ''
                  }
                >
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handlePageDown} disabled={currentPage === 0}>
          Previous
        </button>
        <button
          onClick={handlePageUp}
          disabled={(currentPage + 1) * pageSize >= filteredCustomers.length}
        >
          Next
        </button>
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
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;