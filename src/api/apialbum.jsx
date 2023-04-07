import axios from 'axios';
const URL = 'http://localhost:5000';

const getAlbums = async () => {
  const response = await fetch(`${URL}/albums`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

const getOneAlbum = async id => {
  const response = await fetch(`${URL}/albums/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

const insertAlbum = async dataAlbum => {
  const response = await fetch(`${URL}/albums/create`, {
    method: 'POST',
    body: JSON.stringify(dataAlbum),
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

const insertSongToAlbumAxios = (idAlbum, data) => {
  axios
    .put(`${URL}/albums/${idAlbum}/add-song`, data)
    .then(res => {
      console.log(res);
      alert(res.data.message);
    })
    .catch(err => alert(err.response.data.message));
};

const deleteSongToAlbumAxios = (idAlbum, data) => {
  axios
    .put(`${URL}/albums/${idAlbum}/delete-song`, data)
    .then(res => {
      console.log(res);
      alert(res.data.message);
    })
    .catch(err => console.log(err));
};

const insertAlbumAxios = dataAlbum => {
  axios
    .post(`${URL}/albums/create`, dataAlbum)
    .then(res => {
      console.log(res);
      alert(res.data.message);
    })
    .catch(err => console.log(err));
};

const updateAlbum = async (dataAlbum, id) => {
  await axios
    .put(`${URL}/albums/${id}`, dataAlbum)
    .then(res => {
      alert(res.data.message);
      console.log(res);
    })
    .catch(err => alert(err));
  // const response = await fetch(`${URL}/albums/${dataAlbum._id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(dataAlbum),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const data = await response.json();

  // if (!response.ok) {
  //   throw new Error('Could not Songs');
  // }
  // return data;
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

export {
  getAlbums,
  insertAlbum,
  updateAlbum,
  deleteAlbum,
  insertAlbumAxios,
  getOneAlbum,
  insertSongToAlbumAxios,
  deleteSongToAlbumAxios,
};
