const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

const attachMiddleware = (app) => {
  app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
  app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));

  app.use(compression());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

const attachHandlebars = (app) => {
  app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: '',
  }));
  app.set('view engine', 'handlebars');

  app.set('views', `${__dirname}/../views`);
};

attachMiddleware(app);
attachHandlebars(app);

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
