import { pipe } from 'fp-ts/function';
import * as ReactDOMServer from 'react-dom/server';
import { Writable } from 'stream';

import * as O from 'fp-ts/Option';
import * as React from 'react';

class HtmlWritable extends Writable {
  chunks: Array<Uint8Array> = [];
  html = '';

  getHtml(): string {
    return this.html;
  }

  _write(
    chunk: Uint8Array,
    _encoding: BufferEncoding,
    callback: () => void,
  ): void {
    this.chunks.push(chunk);
    callback();
  }

  _final(callback: () => void): void {
    this.html = Buffer.concat(this.chunks).toString();
    callback();
  }
}

/**
 * Like `renderToString` but asynchronous. Unlike `renderToString`, this will wait for all
 * `<Suspense>` boundaries to resolve.
 *
 * In the future we may consider streaming the response, however this needs more thought as it could
 * have significant implications for HTML caching.
 * https://github.com/reactwg/react-18/discussions/37
 */
export const renderToStringAsync = (children: React.ReactNode) =>
  new Promise((resolve, reject) => {
    const writable = new HtmlWritable();

    let error: O.Option<unknown> = O.none;
    const stream = ReactDOMServer.renderToPipeableStream(children, {
      onAllReady() {
        pipe(
          error,
          O.match(() => {
            stream.pipe(writable);
          }, reject),
        );
      },
      onError(_error) {
        error = O.some(_error);
      },
    });

    writable.on('finish', () => {
      const html = writable.getHtml();
      resolve(html);
    });
  });
