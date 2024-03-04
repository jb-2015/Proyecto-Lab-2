
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const consultas = require('./db/consulta');
const indexRouter = require('./routers/index');
const usuarioController = require('./controllers/usuarioController');
const { check, validationResult } = require('express-validator');
const cors = require('cors');
const port= 3030;
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
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',indexRouter)
//app.use(indexRouter2)

const dotenv= require('dotenv')
dotenv.config({path:'./.env'})
app.use('/resources',express.static('public'));
app.use('/resources',express.static(path.join(__dirname, '/public')));





const connection= require('./config/database')
const Usuario = require('./models/usuario'); 
/*
app.put('/usuario/campos', [
    check('dni').trim().notEmpty().withMessage( 'Ingrese el Numero de Documento')
    .exists()
    .isNumeric()
    .isLength(6),
    check('clave','Ingrese clave minimo 6 carecteres')
    .exists()
    .isLength({ min:6})
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
		console.log( errors.msg)
		const valores= req.body
		const validaciones=errors.array()
		console.log( validaciones)
        res.render('accesoPersonal',{ validaciones: validaciones,valores: valores });
       return 
    }else{
		res.send('Validacion exitosa')
	}
})*/


app.listen(port,()=>{
	console.log(`Servidor iniciado en el puerto http://localhost:${port}`)
})


