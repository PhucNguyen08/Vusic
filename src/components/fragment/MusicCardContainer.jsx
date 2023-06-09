import { useEffect, useState } from 'react';
import '../assets/scss/MusicCardContainer.scss';
import MusicCard from './MusicCard';
import Container from './Container';
import { getSongs } from '../../api/apisong';

function MusicCardContainer() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs()
      .then(data => setSongs(data))
      .catch(err => alert(err));
  }, []);

  return (
    <Container>
      <div className={'music-card-container'}>
        {songs.map((item, i) => (
          <MusicCard key={item._id} music={item} id={i} />
        ))}
      </div>
    </Container>
  );
}

export default MusicCardContainer;
