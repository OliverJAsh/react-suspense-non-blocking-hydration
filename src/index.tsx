import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

const rootEl = document.querySelector('#root')!;
const root = ReactDOM.createRoot(rootEl);

const App = () => <div>Hello, World!</div>;

root.render(<App />);
