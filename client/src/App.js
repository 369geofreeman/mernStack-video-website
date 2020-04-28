import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Redux
import store from "./store/store";
import { loadUser } from "./store/actions/Index";
// Components
import Header from "./containers/Header/Header";
import Navigation from "./Navigation";
// Utils
import setAuthToken from "./assets/utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      <Navigation />
    </Router>
  );
};

export default App;
