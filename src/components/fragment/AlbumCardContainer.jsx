import React from 'react';
import '../assets/scss/AlbumCardContainer.scss';
import AlbumCard from './AlbumCard';
import { useSelector } from 'react-redux';
import Container from './Container';

function AlbumCardContainer() {
  const { playlists } = useSelector(state => state.musicReducer);
  return (
    <Container>
      <div className={'album-card-container'}>
        {playlists.map(item => (
          <AlbumCard key={item.id} music={item} />
        ))}
      </div>
    </Container>
  );
}

export default AlbumCardContainer;
