import * as React from 'react';
import { Expensive } from './Expensive';

const Nested = React.lazy(() => import('./Nested'));

export const App = () => (
  <div>
    <div>App</div>
    <Expensive />
    <Expensive />

    <React.Suspense>
      <Nested />
    </React.Suspense>
  </div>
);
