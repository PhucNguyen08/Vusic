import axios from 'axios';
const URL = 'http://localhost:5000';

const getArtists = async () => {
  const response = await fetch(`${URL}/artists`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not Songs');
  }
  return data;
};

const insertArtist = async dataArtist => {
  const response = await fetch(`${URL}/artists/create`, {
    method: 'POST',
    body: JSON.stringify(dataArtist),
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

const insertArtistAxios = dataArtistAxios => {
  axios
    .post(`${URL}/artists/create`, dataArtistAxios)
    .then(res => {
      console.log(res);
      alert('Bạn đã thêm mới thành công');
    })
    .catch(err => console.log(err));
};

const updateArtist = async (dataArtist, id) => {
  await axios
    .put(`${URL}/artists/${id}`, dataArtist)
    .then(res => {
      console.log(res);
      alert(res.data.message);
    })
    .catch(err => console.log(err));
  // const response = await fetch(`${URL}/artists/${dataArtist._id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(dataArtist),
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

const deleteArtist = async id => {
  const response = await fetch(`${URL}/artists/${id}`, {
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
  getArtists,
  insertArtist,
  updateArtist,
  deleteArtist,
  insertArtistAxios,
};
