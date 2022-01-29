import { createServer } from 'http';
import app from './config/express';

createServer(app).listen(8080, function() {
    console.log('Servidor escutando na porta: ' + this.address().port);
});

