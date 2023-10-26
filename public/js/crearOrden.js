

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
btn_crear.addEventListener('click', async()=>{

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
   
   
    //fetch(`/pedido/creaPedido/${idp}/${diagnostico}/${nombre_medico}/${nro_matricula}/${id_analisis}/${fechacreacion}`)
    try {
        const response = await fetch('/pedido/creaPedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idp,
                diagnostico: diagnostico,
                nombre_medico: nombre_medico,
                nro_matricula: nro_matricula,
                id_analisis: id_analisis,
                fechacreacion: fechacreacion
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Pedido y Orden creados correctamente:', data);
        } else {
            console.error('Error al crear Pedido y Orden:', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }


})
