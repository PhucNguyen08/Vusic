import axios from 'axios';
const URL = 'http://localhost:5000';

const getPlaylists = async () => {
  const response = await fetch(`${URL}/playlists`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
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

const insertPlaylistAxios = async dataPlaylist => {
  axios
    .post(`${URL}/playlists/create`, dataPlaylist)
    .then(res => {
      alert('Bạn đã thêm mới thành công');
      console.log(res);
    })
    .catch(err => console.log(err));
  // const response = await fetch(`${URL}/playlists/${id}/create`, {
  //   method: 'POST',
  //   body: JSON.stringify(dataPlaylist),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const data = await response.json();

  // if (!response.ok) {
  //   throw new Error('Could not playlists');
  // }
  // return data;
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
  getPlaylists,
  insertPlaylist,
  updatePlaylist,
  deletePlaylist,
  insertPlaylistAxios,
};
