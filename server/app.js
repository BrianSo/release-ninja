const { Router } = require('express');

const app = Router();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongo = require('connect-mongo');
const passport = require('passport');
const lusca = require('lusca');
const mongoose = require('mongoose');
const requestLanguage = require('express-request-language');
const csrf = require('./utils/csrf');
const i18n = require('./middlewares/i18n');
const languges = require('./i18n');
const router = require('./router');
const createDelayUntilEvent = require('./utils/delayUntilEvent');
const User = require('./models/User');

mongoose.Promise = Promise;
const MongoStore = mongo(session);

// Express configuration
app.use(process.env.NODE_ENV === "production" ? morgan("combined") : morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  }),
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(requestLanguage({
  languages: Object.keys(languges),
}));
app.use(i18n);
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Router
app.use(router);
app.use(csrf);

//////////////////////
// Bootstrap and Shutdown
/////////////////////

app.bootstrap = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

  await (async function createAdminUser() {
    const existingUser = await User.findOne({});

    if (!existingUser) {
      console.log("Creating Admin Account");
      User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    } else {
      console.log("Admin already exists");
    }
  })();

  console.log('App bootstrapped');
  delayed.eventArrive();
};
app.hotReloadShutdown = async () => {
  await mongoose.disconnect();
};

////// waitUntilBootstrapped
const delayed = createDelayUntilEvent();
app.waitUntilBootstrapped = delayed.delayUntilEvent;

module.exports = app;
