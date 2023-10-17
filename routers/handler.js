import express from "express"

import morgan from "morgan"
import bodyParser from "body-parser"

const router= express.Router()





router.use(express.static("public"))
router.use("/css",express.static('public/css'))
router.use("/js",express.static('public/js'))
router.use("/images",express.static('public/images'))

router.use(morgan('dev'))
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:false}))




router.get("/",(req,res)=>{
	res.render("home")
})
router.get("/portal-paciente",(req,res)=>{
	res.render("accesoPaciente")
})
router.get("/portal-personal",(req,res)=>{
	res.render("accesoPersonal")
})
router.get("/page-administrativo",(req,res)=>{
	res.render("page-administrativo")	
})

router.get("/crear-persona",(req,res)=>{
	
})


export default router