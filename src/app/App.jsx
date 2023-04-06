import React, { useEffect, useState } from 'react';
import './App.scss';
import Home from '../components/Pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/Pages/Login';
import Admin from '../components/Pages/Admin';
import { ThemeContext, themes } from '../api/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylist } from '../actions/actions';
import SignIn from '../components/Pages/SignIn';
import SignUp from '../components/Pages/SignUp';
import { getSongs } from '../api/apisong';

const App = () => {
  const [songs, setSongs] = useState([]);
  const { language } = useSelector(state => state.musicReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getSongs()
      .then(data => setSongs(data))
      .catch(err => alert(err));
  }, []);

  useEffect(() => {
    if (language === null) {
      dispatch(setPlaylist(songs));
    }
  }, [dispatch, language, songs]);

  return (
    <ThemeContext.Provider value={themes.light}>
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </>
    </ThemeContext.Provider>
  );
};

export default App;
