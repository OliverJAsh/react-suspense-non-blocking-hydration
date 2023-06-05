import * as React from 'react';

import { Expensive } from './Expensive';

const Nested = React.lazy(() => import('./Nested'));

const NestedWithSuspenseAndMemo = React.memo(() => (
  <React.Suspense>
    <Nested />
  </React.Suspense>
));

export const App = ({ history }: any) => {
  React.useEffect(() => {
    history.replace({});
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
