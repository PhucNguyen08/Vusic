const URL = 'http://localhost:5000';

const getAccounts = async () => {
  const response = await fetch(`${URL}/accounts`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Users');
  }
  return data;
};

const insertAccount = async dataAccount => {
  const response = await fetch(`${URL}/accounts/create`, {
    method: 'POST',
    body: JSON.stringify({
      dataAccount,
    }),
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

const updateAccount = async dataAccount => {
  const response = await fetch(`${URL}/accounts/${dataAccount._id}`, {
    method: 'PUT',
    body: JSON.stringify({
      dataAccount,
    }),
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

const deleteAccount = async id => {
  const response = await fetch(`${URL}/accounts/${id}`, {
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

export { getAccounts, insertAccount, updateAccount, deleteAccount };
