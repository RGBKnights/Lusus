import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom"; // BrowserRouter
import LandingPage from './client/pages/landing';
import HelpPage from './client/pages/help';
import MatchPage from './client/pages/match';

import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './client/css/bootstrap.min.css';
import './client/css/app.css';

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/help" exact component={HelpPage} />
      <Route path="/match/" component={MatchPage} />
    </div>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));
