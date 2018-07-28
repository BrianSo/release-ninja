const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.resolve(__dirname, '../src') });
const nextHandler = nextApp.getRequestHandler();

(async () => {
  try{

    await nextApp.prepare();

    const server = express();

    server.get('*', nextHandler);

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });

  } catch (ex) {
    console.error(ex.stack);
    process.exit(1);
  }
})();
