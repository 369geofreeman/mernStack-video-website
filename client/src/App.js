import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// my Components
import Header from "./containers/Header/Header";
import Navigation from './Navigation'


const App = () => {
  return (
    <Router>
      <Header />
      <Navigation />
    </Router>
  );
};

export default App;
