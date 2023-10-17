import express from "express"
import path from "path"
import router from "./routers/handler.js"

const app = express()

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(router)

app.listen(3030,()=>{
	console.log("Servidor iniciado en el puerto 3030")
})


