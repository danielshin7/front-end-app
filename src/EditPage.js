import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as restdb from './restdb';

function EditPage({ selectedCustomer }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const isUpdateMode = !!selectedCustomer;

  useEffect(() => {
    if (selectedCustomer) {
      setFormData(selectedCustomer); // Pre-fill form data in update mode
    }
  }, [selectedCustomer]);

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert('All fields are required.');
      return;
    }
    if (isUpdateMode) {
      restdb.put(selectedCustomer.id, formData, () => {
        navigate('/'); // Navigate back to the customer list
      });
    } else {
      restdb.post(formData, () => {
        navigate('/'); // Navigate back to the customer list
      });
    }
  };

  const handleDelete = () => {
    if (!isUpdateMode) return;
    restdb.deleteById(selectedCustomer.id, () => {
      navigate('/'); // Navigate back to the customer list
    });
  };

  const handleCancel = () => {
    navigate('/'); // Go back to the customer list without saving
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>{isUpdateMode ? 'Update' : 'Add'} Customer</h2>
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
        <div>
          <button type="button" onClick={handleSave}>Save</button>
          {isUpdateMode && (
            <button type="button" onClick={handleDelete}>Delete</button>
          )}
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditPage;