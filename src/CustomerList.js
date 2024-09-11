import React from 'react';

function CustomerList({ customers, selectedCustomer, handleCustomerClick }) {
  return (
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
  );
}

export default CustomerList;