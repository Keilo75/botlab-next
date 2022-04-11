import { render } from 'react-dom';
import React from 'react';
import App from './views/App';

// Render application in DOM
render(
  <React.StrictMode>
    <App />{' '}
  </React.StrictMode>,
  document.getElementById('root')
);
