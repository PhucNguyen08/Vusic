const URL = 'http://localhost:5000';

const getSongs = async () => {
  const response = await fetch(`${URL}/songs`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

const insertSong = async dataSong => {
  const response = await fetch(`${URL}/songs/create`, {
    method: 'POST',
    body: JSON.stringify({
      dataSong,
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

const updateSong = async dataSong => {
  const response = await fetch(`${URL}/songs/${dataSong._id}`, {
    method: 'PUT',
    body: JSON.stringify({
      dataSong,
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

const deleteSong = async id => {
  const response = await fetch(`${URL}/songs/${id}`, {
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

export { getSongs, insertSong, updateSong, deleteSong };
