const baseURL = 'http://localhost:4000/customers';

// Get all customers
export async function getAll(setCustomers) {
  const myInit = {
    method: 'GET',
    mode: 'cors',
  };
  try {
    const response = await fetch(baseURL, myInit);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    setCustomers(data);
  } catch (error) {
    alert(error);
  }
}


// Add a new customer
export async function post(customerData, postOpCallback) {
  const myInit = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  };
  try {
    const response = await fetch(baseURL, myInit);
    if (!response.ok) {
      throw new Error(`Error adding customer: ${response.status}`);
    }
    await response.json();
    postOpCallback(); // Reset form or any other post-operation tasks
  } catch (error) {
    alert(error);
  }
}

// Update an existing customer
export async function put(id, customerData, postOpCallback) {
  const url = `${baseURL}/${id}`;
  const myInit = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  };
  try {
    const response = await fetch(url, myInit);
    if (!response.ok) {
      throw new Error(`Error updating customer: ${response.status}`);
    }
    await response.json();
    postOpCallback();
  } catch (error) {
    alert(error);
  }
}

// Delete an existing customer
export async function deleteById(id, postOpCallback) {
  const url = `${baseURL}/${id}`;
  const myInit = {
    method: 'DELETE',
    mode: 'cors',
  };
  try {
    const response = await fetch(url, myInit);
    if (!response.ok) {
      throw new Error(`Error deleting customer: ${response.status}`);
    }
    postOpCallback();
  } catch (error) {
    alert(error);
  }
}


