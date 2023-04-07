import axios from 'axios';
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
    body: JSON.stringify(dataSong),
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

const insertSongAxios = formData => {
  axios
    .post(`${URL}/songs/create`, formData)
    .then(res => {
      alert('Bạn đã thêm mới thành công');
      console.log(res);
    })
    .catch(err => console.log(err));
};

const updateSong = async (dataSong, id) => {
  await axios
    .put(`${URL}/songs/${id}`, dataSong)
    .then(res => {
      alert(res.data.message);
      console.log(res);
    })
    .catch(err => alert(err));
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

const searchSong = async input => {
  const response = await fetch(`${URL}/songs?_find&search=${input}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

const sortSong = async input => {
  const response = await fetch(`${URL}/songs?_sort&column=name&type=${input}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

export {
  getSongs,
  insertSong,
  updateSong,
  deleteSong,
  insertSongAxios,
  searchSong,
  sortSong,
};
