/**
 * https://stackoverflow.com/questions/72858719/react-ssr-with-custom-html
 * https://github.com/facebook/react/issues/24232
 */
import { flow, pipe } from 'fp-ts/function';
import * as ReactDOMServer from 'react-dom/server';
import { Writable } from 'stream';

import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
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
 * https://linear.app/unsplash/issue/UNS-1654/investigate-streaming-ssr-with-suspense
 *
 * We catch errors because our React components are not pure. Maybe some day they will be and we can
 * remove this catch.
 */
export const renderToStringAsync: (
  children: React.ReactNode,
) => TE.TaskEither<unknown, string> = (children) => () =>
  new Promise((resolve) => {
    const writable = new HtmlWritable();

    // eslint-disable-next-line fp/no-let
    let error: O.Option<unknown> = O.none;
    const stream = ReactDOMServer.renderToPipeableStream(children, {
      onAllReady() {
        pipe(
          error,
          O.match(() => {
            stream.pipe(writable);
          }, flow(E.left, resolve)),
        );
      },
      onError(_error) {
        error = O.some(_error);
      },
    });

    writable.on('finish', () => {
      const html = writable.getHtml();
      resolve(E.right(html));
    });
  });
