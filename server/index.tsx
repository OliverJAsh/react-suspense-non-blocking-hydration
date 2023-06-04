import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../shared/App';

const app = express();

app.use('/a', express.static(path.join(__dirname, '../../target-webpack')));

app.get('/', (req, res) => {
  const x = renderToString(<App />);
  res.send(`
<div id="root">${x}</div>
<script src="a/index.js"></script>
`);
});

app.listen(8080, () => {
  console.log('Started on port 8080');
});
