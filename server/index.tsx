import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import { App } from '../shared/App';
import { renderToStringAsync } from './renderToStringAsync';

const app = express();

app.use('/a', express.static(path.join(__dirname, '../../target-webpack')));

app.get('/', (req, res) => {
  const htmlPromise = renderToStringAsync(<App />);
  htmlPromise.then((html) => {
    res.send(`
  <div id="root">${html}</div>
  <script src="a/index.js"></script>
  `);
  });
});

app.listen(8080, () => {
  console.log('Started on port 8080');
});
