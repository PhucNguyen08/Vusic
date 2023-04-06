import { useState, useEffect } from 'react';
import '../assets/scss/AlbumCardContainer.scss';
import AlbumCard from './AlbumCard';
// import { useSelector } from 'react-redux';
import Container from './Container';
import { Route, Switch } from 'react-router-dom';
import DetailAlbum from '../Pages/DetailAlbum';
import { getAlbums } from '../../api/apialbum';

function AlbumCardContainer() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums()
      .then(data => setAlbums(data))
      .catch(err => alert(err));
  }, []);

  // const { playlists } = useSelector(state => state.musicReducer);
  return (
    <>
      <Container>
        <div style={{ display: 'flex' }}>
          {albums.map(item => (
            <AlbumCard key={item._id} music={item} />
          ))}
        </div>
        <Switch>
          <Route path=":albumId" component={DetailAlbum} />
        </Switch>
      </Container>
    </>
  );
}

export default AlbumCardContainer;
