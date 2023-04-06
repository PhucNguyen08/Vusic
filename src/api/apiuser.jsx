const URL = 'http://localhost:5000';

const getUser = async () => {
  const response = await fetch(`${URL}/users/profile`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Users');
  }
  return data;
};

const insertUser = async dataUsers => {
  const response = await fetch(`${URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(dataUsers),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not insert user');
  }
  return data;
};

const loginUser = async dataUsers => {
  const response = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(dataUsers),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not update User');
  }
  return data;
};

const updateUser = async dataUsers => {
  const response = await fetch(`${URL}/users/${dataUsers._id}`, {
    method: 'PUT',
    body: JSON.stringify(dataUsers),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not update User');
  }
  return data;
};

const deleteUser = async id => {
  const response = await fetch(`${URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

export { getUser, insertUser, updateUser, deleteUser, loginUser };
