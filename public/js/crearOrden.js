

const seleccionador= document.getElementById('analisisList')
const muestraSolicitadas=  document.getElementById('muestrasSolicitadas')

seleccionador.addEventListener('change',()=>{
    
    const id = seleccionador.value

    fetch(`/muestra/obtenerMuestras/${id}`)
    .then(res=>res.json())
    .then(datos=>{
        muestraSolicitadas.innerHTML=""
        datos.forEach(d=>{
            let li = document.createElement('li')
            let h3 = document.createElement('h2')

            h3.innerText= d.g_descripcion
            li.appendChild(h3)

            muestraSolicitadas.appendChild(li)
        })
    })

})

const btn_crear=document.getElementById('btncrear')
btn_crear.addEventListener('click', ()=>{

    const idp=document.getElementById('id_persona').value
    const diagnostico=document.getElementById('diagnostico').value
    const nombre_medico=document.getElementById('nombre_medico').value
    const nro_matricula=document.getElementById('nro_matricula').value
    const id_analisis=document.getElementById('analisisList').value
    const fechacreacion=document.getElementById('fecha_creacion').value

    console.log(idp)
    console.log(diagnostico)
    console.log(nombre_medico)
    console.log(nro_matricula)
    console.log(id_analisis)
    console.log(fechacreacion)
   
   
    fetch(`/creaPedido/${idp}/${diagnostico}/${nombre_medico}/${nro_matricula}/${id_analisis}/${fechacreacion}`)


})
