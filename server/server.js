const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env.default') });

const express = require('express');
const next = require('next');
const app = require('./app');
const errorHandler = require('./middlewares/errorHandler');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.resolve(__dirname, '../src') });
const nextHandler = nextApp.getRequestHandler();

(async () => {
  try{

    await nextApp.prepare();

    const server = express();
    server.set('trust proxy', true);
    server.use((req, res, next) => {
      req.nextApp = nextApp;
      next();
    });

    if(process.env.NODE_ENV === 'production') {
      await app.bootstrap();
      server.use(app);
    } else {
      let app = require('./app');
      await app.bootstrap();

      // Hot reload the router
      const chokidar = require('chokidar');
      const watcher = chokidar.watch(__dirname);

      const modulesToDelete = ['mongoose'];
      const modulePaths = modulesToDelete.map(m => path.resolve(__dirname, `../node_modules/${m}`));
      modulePaths.push(__dirname);
      watcher.on('ready', () => watcher.on('all', () => {
        Object.keys(require.cache).forEach((id) => {
          modulePaths.forEach(p => {
            if (id.indexOf(p) === 0)
              delete require.cache[id];
          });
        });

        (async () => {
          app.hotReloadShutdown();
          app = require('./app'); // Reload app
          await app.bootstrap();
        })().catch(ex => {
          console.error(ex.stack);
        });
      }));
      server.use(async function (req, res, next) {
        await app.waitUntilBootstrapped();
        app(req, res, next)
      });
    }

    server.get('*', nextHandler);
    server.use(errorHandler);

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });

  } catch (ex) {
    console.error(ex.stack);
    process.exit(1);
  }
})();
