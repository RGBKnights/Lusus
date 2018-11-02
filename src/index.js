import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom"; // Link
import LandingPage from './client/landing';
import BuildPage from './client/build';
import ClientPage from './client/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import './client/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './client/css/app.css';

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/match/" component={ClientPage} />
      <Route path="/build/" component={BuildPage} />
    </div>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));
