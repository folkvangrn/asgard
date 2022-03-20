import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/_index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Root />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
