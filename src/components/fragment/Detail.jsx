import React from 'react';
import { useSelector } from 'react-redux';
import MusicCardContainer from './MusicCardContainer';
import '../assets/scss/Detail.scss';

const Detail = props => {
  const albumId = props.albumId;
  const { playlists } = useSelector(state => state.musicReducer);
  console.log(typeof albumId);
  const list = playlists.find(item => +item.id === albumId);
  console.log(list);
  return (
    <>
      <div className="container">
        <img
          src={require('../assets/img/' + list.img)}
          alt="haha"
          width={100}
          height={100}
        />
        <h3 className="name">{list.name}</h3>
      </div>
      <MusicCardContainer />
    </>
  );
};

export default Detail;
