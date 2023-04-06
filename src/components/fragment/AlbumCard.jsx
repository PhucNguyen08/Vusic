import React, { useEffect, useState } from 'react';
import '../assets/scss/AlbumCard.scss';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Name from './Name';
import { Skeleton } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

function AlbumCard(props) {
  const { name, image, _id } = props.music;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={'album-card'}>
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
          <Link to={`/home/album/${_id}`}>
            <div className={'album-card-cover'}>
              <img src={image} alt={name} />
              <div className="play-circle">
                <PlayCircleFilledWhiteIcon />
              </div>
            </div>
            <React.Fragment>
              <Name name={name} className={'song-name'} length={name.length} />
              {/* <Name
                name={author_name}
                className={'author-name'}
                length={author_name.length}
              /> */}
            </React.Fragment>
          </Link>
        </>
      )}
    </div>
  );
}

export default AlbumCard;
