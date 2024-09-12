import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerList({ customers, setSelectedCustomer, selectedCustomer }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Highlights and deselects customer on click
  const handleCustomerClick = (customer) => {
    if (selectedCustomer && selectedCustomer.id == customer.id){
      setSelectedCustomer(null);
    }else {
      setSelectedCustomer(customer);
    }
  };

  return (
    <div>
      <h1>Customer List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Total records: {filteredCustomers.length}</p>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => navigate('/form')}>Add</button>
      <button
        onClick={() => navigate('/form')}
        disabled={!selectedCustomer}
      >
        Update
      </button>
    </div>
  );
}

export default CustomerList;