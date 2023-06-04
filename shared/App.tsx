import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Expensive } from './Expensive';

const Nested = React.lazy(() => import('./Nested'));

const NestedWithSuspenseAndMemo = React.memo(() => (
  <React.Suspense>
    <Nested />
  </React.Suspense>
));

export const App = () => {
  const history = useHistory();
  React.useEffect(() => {
    history.replace(history.location);
  }, []);

  return (
    <div>
      <div>App</div>
      <Expensive />
      <Expensive />

      <NestedWithSuspenseAndMemo />
    </div>
  );
};
