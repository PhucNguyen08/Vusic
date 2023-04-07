import { useEffect, useState } from 'react';
import '../assets/scss/MusicCardContainer.scss';
import MusicCard from './MusicCard';
import Container from './Container';
import { getOneAlbum } from '../../api/apialbum';

function MusicCardAlbum(props) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getOneAlbum(props.id)
      .then(data => setSongs(data.songs))
      .catch(err => alert(err));
  }, [props.id]);

  return (
    <Container>
      <div className={'flex'}>
        {songs.map((item, i) => (
          <MusicCard key={item._id} music={item} id={i} />
        ))}
      </div>
    </Container>
  );
}

export default MusicCardAlbum;
