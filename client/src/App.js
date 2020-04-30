import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Redux
import store from "./store/store";
import { loadUser, getSelectedVideos } from "./store/actions/Index";
// Components
import Header from "./containers/Header/Header";
import Navigation from "./navigation/Navigation";
// Utils
import setAuthToken from "./assets/utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getSelectedVideos());
  }, []);

  return (
    <Router>
      <Header />
      <Navigation />
    </Router>
  );
};

export default App;
