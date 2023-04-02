const URL = 'http://localhost:5000';

const getAlbums = async () => {
  const response = await fetch(`${URL}/albums`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

const insertAlbum = async dataAlbum => {
  const response = await fetch(`${URL}/albums/create`, {
    method: 'POST',
    body: JSON.stringify({
      dataAlbum,
    }),
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

const updateAlbum = async dataAlbum => {
  const response = await fetch(`${URL}/albums/${dataAlbum._id}`, {
    method: 'PUT',
    body: JSON.stringify({
      dataAlbum,
    }),
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

const deleteAlbum = async id => {
  const response = await fetch(`${URL}/albums/${id}`, {
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

export { getAlbums, insertAlbum, updateAlbum, deleteAlbum };
