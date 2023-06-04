import { createBrowserHistory } from 'history';
import { hydrateRoot } from 'react-dom/client';
import { Router } from 'react-router-dom';

import * as React from 'react';
import { App } from '../shared/App';

const container = document.getElementById('root')!;

const history = createBrowserHistory();

hydrateRoot(
  container,
  <Router history={history}>
    <App />
  </Router>,
);
