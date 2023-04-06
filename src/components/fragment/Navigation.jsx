import React, { useContext, useState, useEffect } from 'react';
import '../assets/scss/Navigation.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchBar from './SearchBar';
import Brand from './Brand';
import DropDownProfile from './DropDownProfile';
import { Button } from '@material-ui/core';
import Cookies from 'js-cookie';
import { ThemeContext } from '../../api/Theme';
import { Link } from 'react-router-dom';
import { getUser } from '../../api/apiuser';

function Navigation() {
  const [profileUser, setProfileUser] = useState();
  const [isLanguageListOpen, setLangList] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    getUser()
      .then(data => setProfileUser(data))
      .catch(err => console.log(err));
  }, []);

  console.log(profileUser);

  function handleOpenProfile() {
    if (isLanguageListOpen === true) setLangList(!isLanguageListOpen);
    setOpenProfile(!isOpenProfile);
  }
  const useStyle = useContext(ThemeContext);
  return (
    <nav style={useStyle.component}>
      <Brand />
      <div className={'navigation'}></div>
      <SearchBar />
      {Cookies.get('token') === undefined && (
        <div>
          <Link to={'/signin'} className="link">
            Log In
          </Link>
        </div>
      )}
      {!(Cookies.get('token') === undefined) && (
        <div className="profile" onClick={handleOpenProfile}>
          <Button
            className={'Dropdown-btn'}
            endIcon={isOpenProfile ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          >
            {profileUser?.name}
          </Button>
          {isOpenProfile && <DropDownProfile />}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
