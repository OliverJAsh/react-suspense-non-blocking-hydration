import * as React from 'react';
import { Expensive } from './Expensive';

const Nested: React.FC = () => (
  <>
    <div>Suspense</div>
    <Expensive />
    <Expensive />
  </>
);

export default Nested;
