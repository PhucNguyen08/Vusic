import React, { useContext, useEffect, useState } from 'react';
import './css/Home.scss';
import Navigation from '../fragment/Navigation';
import MobileTopNavigation from '../fragment/MobileTopNavigation';
import SideBarAdmin from '../fragment/SideBarAdmin';
import MusicCardContainer from '../fragment/MusicCardContainer';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../api/Theme';
import Profile from './Profile';
import CurrentPlayingLarge from '../fragment/CurrentPlayingLarge';
import Account from './admin/Account';
import About from './About';
import User from './admin/User';
import Song from './admin/Song';
import Artist from './admin/Artist';
import Album from './admin/Album';
import Playlist from './admin/Playlist';
import { Skeleton } from '@material-ui/lab';

function getCurrPage(pathName) {
  switch (pathName) {
    case '/admin':
      return <MusicCardContainer />;
    case '/admin/account':
      return <Account />;
    case '/admin/about':
      return <About />;
    case '/admin/profile':
      return <Profile />;
    case '/admin/user':
      return <User />;
    case '/admin/songs':
      return <Song />;
    case '/admin/artist':
      return <Artist />;
    case '/admin/album':
      return <Album />;
    case '/admin/playlist':
      return <Playlist />;
    default:
      return null;
  }
}

function Admin() {
  const [screenSize, setScreenSize] = useState(undefined);
  const [Page, setCurrPage] = useState(<MusicCardContainer />);

  let pathname = window.location.pathname;
  useEffect(() => {
    setCurrPage(getCurrPage(pathname));
  }, [pathname]);

  window.addEventListener('resize', handleResize);

  function handleResize() {
    setScreenSize(window.innerWidth);
  }

  useEffect(() => {
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  });

  const useStyle = useContext(ThemeContext);
  const { bannerOpen } = useSelector(state => state.musicReducer);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div style={useStyle.component} className={'home-container'}>
      {!loaded ? (
        <div className="Home-skeleton">
          <Skeleton animation={'wave'} variant={'rect'} height={'100vh'} />
        </div>
      ) : (
        <>
          {screenSize <= 970 ? <MobileTopNavigation /> : <Navigation />}
          <section className={'home-music-container'}>
            <div className="sidebar-home">
              <SideBarAdmin />
            </div>
            <div className="main-home">{Page}</div>
          </section>
          {bannerOpen && (
            <section className="current-large-banner">
              <CurrentPlayingLarge />
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
