
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const consultas = require('./db/consulta');
const indexRouter = require('./routers/index');
//const indexRouter2 = require('./routers/handler.js');

/*
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

*/
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(indexRouter)
//app.use(indexRouter2)
app.listen(3030,()=>{
	console.log("Servidor iniciado en el puerto 3030")
})


