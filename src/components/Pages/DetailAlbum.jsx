import React, { useState, useEffect } from 'react';
import './css/DetailAlbum.scss';
import { getAlbums } from '../../api/apialbum';
import MusicCardAlbum from '../fragment/MusicCardAlbum';

const DetailAlbum = props => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums()
      .then(data => setAlbums(data))
      .catch(err => alert(err));
  }, []);

  console.log(albums);
  const albumId = window.location.pathname.substring(12);
  const listAlbums = albums?.find(item => item._id === albumId);
  console.log(listAlbums);

  return (
    <React.Fragment>
      <div className="container">
        <img src={listAlbums?.image} alt="haha" width={100} height={100} />
        <h3 className="name">{listAlbums?.name}</h3>
      </div>
      <MusicCardAlbum id={albumId} />
    </React.Fragment>
  );
};

export default DetailAlbum;
