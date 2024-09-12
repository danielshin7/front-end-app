import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CustomerAddUpdateForm from './CustomerAddUpdateForm';

//Uses mock to navigate through application
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

//Declare mock functions and create a blank customer to test CustomerAddUpdateForm
describe('CustomerAddUpdateForm', () => {
  const blankCustomer = { name: '', email: '', password: '' };
  let mockHandleSave, mockHandleDelete, mockSetSelectedCustomer, mockNavigate;

  //Runs before each test case
  beforeEach(() => {
    mockHandleSave = jest.fn((formData, callback) => callback());
    mockHandleDelete = jest.fn((callback) => callback());
    mockSetSelectedCustomer = jest.fn();
    mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  //Test for add function
  test('should add a new customer', () => {
    render(
      <CustomerAddUpdateForm
        selectedCustomer={null}
        blankCustomer={blankCustomer}
        handleSave={mockHandleSave}
        handleDelete={mockHandleDelete}
        setSelectedCustomer={mockSetSelectedCustomer}
      />,
      { wrapper: MemoryRouter }
    );

    // Simulate filling in the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe', name: 'name' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com', name: 'email' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123456', name: 'password' },
    });

    // Simulate clicking the "Save" button
    fireEvent.click(screen.getByText(/save/i));

    // Expect handleSave to be called with correct form data
    expect(mockHandleSave).toHaveBeenCalledWith(
      { name: 'John Doe', email: 'john@example.com', password: '123456' },
      expect.any(Function) // callback function passed to navigate
    );
  });

  //Test for update function
  test('should update an existing customer', () => {
    const existingCustomer = { id: 1, name: 'Jane Doe', email: 'jane@example.com', password: 'password123' };

    render(
      <CustomerAddUpdateForm
        selectedCustomer={existingCustomer}
        blankCustomer={blankCustomer}
        handleSave={mockHandleSave}
        handleDelete={mockHandleDelete}
        setSelectedCustomer={mockSetSelectedCustomer}
      />,
      { wrapper: MemoryRouter }
    );

    // Form is pre-filled with selected customer's info
    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument();

    // Simulate updating the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Jane Smith', name: 'name' },
    });

    // Simulate clicking the "Save" button
    fireEvent.click(screen.getByText(/save/i));

    // Expect handleSave to be called with the updated data
    expect(mockHandleSave).toHaveBeenCalledWith(
      { id: 1, name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
      expect.any(Function)
    );
  });

  //Test for cancel button
  test('should cancel and return to customer list page', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <CustomerAddUpdateForm
                selectedCustomer={null}
                blankCustomer={blankCustomer}
                handleSave={mockHandleSave}
                handleDelete={mockHandleDelete}
                setSelectedCustomer={mockSetSelectedCustomer}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/cancel/i));

    // Ensure navigate is called with '/'
    expect(mockNavigate).toHaveBeenCalledWith('/');
    // Ensure setSelectedCustomer is called with null
    expect(mockSetSelectedCustomer).toHaveBeenCalledWith(null);
  });

  //Test for delete function
  test('should delete a customer and return to customer list page', () => {
    const existingCustomer = { id: 1, name: 'Jane Doe', email: 'jane@example.com', password: 'password123' };

    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <CustomerAddUpdateForm
                selectedCustomer={existingCustomer}
                blankCustomer={blankCustomer}
                handleSave={mockHandleSave}
                handleDelete={mockHandleDelete}
                setSelectedCustomer={mockSetSelectedCustomer}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/delete/i));

    // Ensure handleDelete is called with a callback
    expect(mockHandleDelete).toHaveBeenCalledWith(expect.any(Function));
    // Ensure navigate is called with '/'
    expect(mockNavigate).toHaveBeenCalledWith('/');
    //Ensure the mock customer is not found within the customer list
    expect(screen.queryByText(/Jane Doe/i )).not.toBeInTheDocument();
  });
});