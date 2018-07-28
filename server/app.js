const { Router } = require('express');

const app = Router();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongo = require('connect-mongo');
const passport = require('passport');
const lusca = require('lusca');
const mongoose = require('mongoose');
const router = require('./router');

mongoose.Promise = Promise;
const MongoStore = mongo(session);

// Express configuration
app.use(process.env.NODE_ENV === "production" ? morgan("combined") : morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Router
app.use(router);


//////////////////////
// Bootstrap and Shutdown
/////////////////////

app.bootstrap = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  resolveWaitUntilBootstrapped();
};
app.hotReloadShutdown = async () => {
  await mongoose.disconnect();
};

////// waitUntilBootstrapped

let bootstrapped = false;
const bootstrapResolves = [];
function resolveWaitUntilBootstrapped() {
  console.log('App bootstrapped');
  bootstrapped = true;
  for(const resolve of bootstrapResolves) {
    try {
      resolve();
    } catch (ex) {
      console.error(ex);
    }
  }
  // clear the array
  bootstrapResolves.splice(0,bootstrapResolves.length);
}
app.waitUntilBootstrapped = async () => {
  if (bootstrapped)
    return;
  return new Promise((resolve) => {
    bootstrapResolves.push(resolve);
  });
};

module.exports = app;
