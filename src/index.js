import express from 'express';
import morgan from 'morgan';
import engine from 'ejs-mate';
import path from 'path';
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine); // se inicializa el motor de plantilla
app.set('view engine', 'ejs'); // setea el motor de plantillas
app.set('views', path.join(__dirname, 'views')); // dice donde están las carpetas de las vistas

//middlewares
app.use(morgan('dev')); //define que se usa morgan con su configuración de development
// muestra por consola la consulta de usuarios

//routes
app.use(require('./routes/index'));

//static files

//start
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});