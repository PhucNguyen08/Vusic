import React, { useContext } from 'react';
import '../assets/scss/DropDownProfile.scss';
import { ThemeContext } from '../../api/Theme';
// import HoverButton from './HoverButton';
// import { AccountBox } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const DropDownProfile = () => {
  const useStyle = useContext(ThemeContext);
  const history = useHistory();

  function handleLogOut() {
    Cookies.remove('token');
    history.replace('/');
  }
  return (
    <div style={useStyle.component} className="dropdown-profile">
      {/* <HoverButton Icon={AccountBox} variant={'text'} text={'Profile'} /> */}
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  );
};
export default DropDownProfile;
