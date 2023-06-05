import { hydrateRoot } from 'react-dom/client';

import * as React from 'react';
import { App } from '../shared/App';

const container = document.getElementById('root')!;

class History {
  callback?: (location: {}) => void;

  listen(callback: (location: {}) => void) {
    this.callback = callback;
  }

  replace(location: {}) {
    this.callback!(location);
  }
}
const history = new History();

const Context = React.createContext<{} | null>(null);

const Router = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = React.useState({});

  React.useLayoutEffect(() => {
    history.listen(setLocation);
  }, []);

  return <Context.Provider value={location}>{children}</Context.Provider>;
};

hydrateRoot(
  container,
  <Router>
    <App history={history} />
  </Router>,
);
