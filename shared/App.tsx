import * as React from 'react';

export const Expensive = () => {
  const end = Date.now() + 500;
  while (Date.now() < end) {
    // do nothing
  }

  return <div>Expensive</div>;
};
export const App = () => (
  <div>
    <div>App</div>
    <Expensive />
    <Expensive />

    <React.Suspense>
      <div>Suspense</div>
      <Expensive />
      <Expensive />
    </React.Suspense>
  </div>
);
