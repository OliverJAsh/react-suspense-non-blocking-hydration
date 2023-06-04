import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from '../shared/App';

const rootEl = document.querySelector('#root')!;

ReactDOM.hydrateRoot(rootEl, <App />);
