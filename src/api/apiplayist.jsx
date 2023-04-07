import axios from 'axios';
const URL = 'http://localhost:5000';

const getOnePlaylist = async id => {
  const response = await fetch(`${URL}/playlists/id/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

const getAllPlaylists = async id => {
  const response = await fetch(`${URL}/playlists/user/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

const insertSongToPlaylistAxios = (idPlaylist, data) => {
  axios
    .put(`${URL}/playlists/${idPlaylist}/add-song`, data)
    .then(res => {
      console.log(res);
      alert(res.data.message);
    })
    .catch(err => alert(err.response.data.message));
};

const deleteSongToPlaylistAxios = (idPlaylist, data) => {
  axios
    .put(`${URL}/playlists/${idPlaylist}/delete-song`, data)
    .then(res => {
      console.log(res);
      alert(res.data.message);
    })
    .catch(err => console.log(err));
};

const insertPlaylist = async dataPlaylist => {
  const response = await fetch(`${URL}/playlists/create`, {
    method: 'POST',
    body: JSON.stringify(dataPlaylist),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not playlists');
  }
  return data;
};

const insertPlaylistAxios = async (dataPlaylist, id) => {
  axios
    .post(`${URL}/playlists/${id}/create`, dataPlaylist)
    .then(res => {
      alert('Bạn đã thêm mới thành công');
      console.log(res);
    })
    .catch(err => console.log(err));
};

const updatePlaylist = async dataPlaylist => {
  const response = await fetch(`${URL}/playlists/${dataPlaylist._id}`, {
    method: 'PUT',
    body: JSON.stringify(dataPlaylist),
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

const deletePlaylist = async id => {
  const response = await fetch(`${URL}/playlists/${id}`, {
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
  getOnePlaylist,
  getAllPlaylists,
  insertPlaylist,
  updatePlaylist,
  deletePlaylist,
  insertPlaylistAxios,
  insertSongToPlaylistAxios,
  deleteSongToPlaylistAxios,
};
