import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  //Array containing customer data 
  const [customers] = useState([
    { id: 1, name: 'Daniel', email: 'daniel@example.com', password: 'password' },
    { id: 2, name: 'Pablo', email: 'pablo@example.com', password: 'password' },
    { id: 3, name: 'Iris', email: 'iris@example.com', password: 'password' }
  ]);

  // State for form
  const [formState, setFormState] = useState('Add');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Function stubs
  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const handleSave = () => {
    console.log('Save button clicked');
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <h1>Customer Management</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add or Update Customer</h2>
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
          <button type="button" onClick={handleDelete}>Delete</button>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default App;