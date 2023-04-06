import React, { useEffect, useState } from 'react';
import '../assets/scss/AddMusicPlaylist.scss';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { useDispatch } from 'react-redux';
import { increaseTimesPlayed, setCurrentPlaying } from '../../actions/actions';
import Name from './Name';
import { Skeleton } from '@material-ui/lab';
import Box from '@material-ui/core/Box';

function AddMusicPlaylist(props) {
  const { name, img } = props.music;

  const [isHovered, setHovered] = useState(false);

  function handleResponse() {
    setHovered(!isHovered);
  }

  const dispatch = useDispatch();

  function handlePlay() {
    dispatch(setCurrentPlaying(props.music));
    dispatch(increaseTimesPlayed(props.music.id));
  }

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={'wrapper-music-card'}>
      {!loaded ? (
        <div className={'Skeleton-top'}>
          <Skeleton variant="rect" width={50} height={50} />
          <Box pt={0.5}>
            <Skeleton />
            <Skeleton width="20%" />
          </Box>
        </div>
      ) : (
        <>
          <div
            onClick={handlePlay}
            className={'music-card-cover'}
            onMouseOver={handleResponse}
          >
            <img src={require('../assets/img/' + img)} alt={name} />
            <div className="play-circle">
              <PlayCircleFilledWhiteIcon />
            </div>
            <React.Fragment>
              <Name
                name={name}
                className={'song-name ms-2'}
                length={name.length}
              />
            </React.Fragment>
          </div>
        </>
      )}
    </div>
  );
}

export default AddMusicPlaylist;
