import React, { useEffect, useState } from 'react';
import '../assets/scss/MusicCard.scss';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { useDispatch } from 'react-redux';
import { increaseTimesPlayed, setCurrentPlaying } from '../../actions/actions';
import Name from './Name';
import { Skeleton } from '@material-ui/lab';
import Box from '@material-ui/core/Box';

function MusicCard(props) {
  const { name, image } = props.music;

  const [isHovered, setHovered] = useState(false);

  function handleResponse() {
    setHovered(!isHovered);
  }

  const dispatch = useDispatch();

  function handlePlay() {
    dispatch(setCurrentPlaying(props.music));
    dispatch(increaseTimesPlayed(props.id));
  }

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={'music-card'}>
      {!loaded ? (
        <div className={'Skeleton-top'}>
          <Skeleton variant="rect" width={210} height={210} />
          <Box pt={0.5}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </div>
      ) : (
        <>
          <div
            onClick={handlePlay}
            className={'music-card-cover'}
            onMouseOver={handleResponse}
          >
            <img src={image} alt={name} />
            <div className="play-circle">
              <PlayCircleFilledWhiteIcon />
            </div>
          </div>
          <React.Fragment>
            <Name name={name} className={'song-name'} />
            {/* <Name
              name={author_name}
              className={'author-name'}
              length={author_name.length}
            /> */}
          </React.Fragment>
        </>
      )}
    </div>
  );
}

export default MusicCard;
