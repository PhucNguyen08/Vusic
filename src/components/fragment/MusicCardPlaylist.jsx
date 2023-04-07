// import { wrap } from 'lodash';
import '../assets/scss/MusicCardContainer.scss';
import MusicCard from './MusicCard';

function MusicCardPlaylist(props) {
  return (
    <div className={'flex'}>
      {props.songs.map((item, i) => (
        <MusicCard key={item._id} music={item} id={i} />
      ))}
    </div>
  );
}

export default MusicCardPlaylist;
