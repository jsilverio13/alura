/* Código simplório, apenas para fornecer o serviço para a aplicação */

import express from 'express';
var app = express();
import routes from '../app/routes';
import path from 'path';
import { json } from 'body-parser';

app.use(json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app);

export default app;