import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/app';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './client/app.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
