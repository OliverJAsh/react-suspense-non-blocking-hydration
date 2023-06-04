import * as express from 'express';
import { unsafeUnwrap } from 'fp-ts-std/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import * as path from 'path';
import * as React from 'react';
import { App } from '../shared/App';
import { renderToStringAsync } from './renderToStringAsync';

const app = express();

app.use('/a', express.static(path.join(__dirname, '../../target-webpack')));

app.get('/', (req, res) => {
  const y = pipe(renderToStringAsync(<App />), unsafeUnwrap);
  y.then((x) => {
    res.send(`
  <div id="root">${x}</div>
  <script src="a/index.js"></script>
  `);
  });
});

app.listen(8080, () => {
  console.log('Started on port 8080');
});
