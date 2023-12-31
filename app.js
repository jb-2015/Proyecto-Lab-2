
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const consultas = require('./db/consulta');
const indexRouter = require('./routers/index');


const cors = require('cors');

app.use(cors());



/*
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

*/

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter)
//app.use(indexRouter2)
app.listen(3030,()=>{
	console.log("Servidor iniciado en el puerto 3030")
})


