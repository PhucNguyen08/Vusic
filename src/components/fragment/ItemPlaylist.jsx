import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FeaturedPlayList } from '@material-ui/icons';

function ItemPlaylist(props) {
  const title = props.title;
  const className = props.className;
  const sideBarRef = useRef();
  const href = props.href;
  return (
    <Button
      onClick={() => {
        sideBarRef.current.click();
      }}
      className={className}
      startIcon={<FeaturedPlayList />}
    >
      <Link ref={sideBarRef} to={href} />
      {title}
    </Button>
  );
}

export default ItemPlaylist;
