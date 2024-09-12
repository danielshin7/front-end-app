import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerAddUpdateForm({
  selectedCustomer,
  blankCustomer,
  handleSave,
  handleDelete,
  setSelectedCustomer,
}) {
  const [formData, setFormData] = useState(blankCustomer);
  const navigate = useNavigate();

  //Sets the field inputs as selected customer or blank 
  useEffect(() => {
    if (selectedCustomer) {
      setFormData(selectedCustomer);
    } else {
      setFormData(blankCustomer);
    }
  }, [selectedCustomer, blankCustomer]);

  //Allows for field input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Navigates back to first page when cancel is clicked
  const handleCancel = () => {
    setSelectedCustomer(null);
    navigate('/');
  };

  return (
    <div>
      <h2>{selectedCustomer ? 'Update' : 'Add'} Customer</h2>
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
        <button
          type="button"
          onClick={() =>
            handleSave(formData, () => {
              navigate('/');
            })
          }
        >
          Save
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        {selectedCustomer && (
          <button
            type="button"
            onClick={() =>
              handleDelete(() => {
                navigate('/');
              })
            }
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
}

export default CustomerAddUpdateForm;