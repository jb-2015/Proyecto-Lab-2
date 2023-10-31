

const seleccionador= document.getElementById('analisisList')
const muestraSolicitadas=  document.getElementById('muestrasSolicitadas')

seleccionador.addEventListener('change',async ()=>{
    
    const id = seleccionador.value

    await fetch(`/muestra/obtenerMuestras/${id}`)
    .then(res=>res.json())
    .then(datos=>{
        muestraSolicitadas.innerHTML=""
        datos.forEach(d=>{
            let li = document.createElement('li')
            let h2 = document.createElement('h2')

            li.classList.add('f-row')


            h2.innerText= d.g_descripcion
            li.appendChild(h2)

            let inp = document.createElement('input')
            inp.type= 'checkbox'

            inp.id= d.id_guiaM
            li.appendChild(inp)
            


            

            muestraSolicitadas.appendChild(li)
        })
    })

})

const btn_crear=document.getElementById('btncrear')
btn_crear.addEventListener('click', async()=>{
    const dniP= document.getElementById('dni_persona').value
    const idp=document.getElementById('id_persona').value
    const diagnostico=document.getElementById('diagnostico').value
    const nombre_medico=document.getElementById('nombre_medico').value
    const nro_matricula=document.getElementById('nro_matricula').value
    const id_analisis=document.getElementById('analisisList').value
    const fechacreacion=document.getElementById('fecha_creacion').value
    const estadoOrden = document.getElementById('estado_orden').value
    //RECUPERAR MUESTRAS Y SI HAN SIDO PRESENTADAS O NO
    let mstrs= []

    let auxLi= muestraSolicitadas.querySelectorAll('li')

    auxLi.forEach(ali=>{
        let nomMuestra= ali.querySelector('h2')
        let entregada= ali.querySelector('input[type="checkbox"]')

        mstrs.push({nombre_muestra: nomMuestra.innerText,entregado:entregada.checked})
    })



    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/




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
                fechacreacion: fechacreacion,
                estado_orden: estadoOrden,
                muestras: mstrs

            })
        });
        /*response.then(res=>res.json())
        .then(data=>{
            console.log('Pedido y Orden creados correctamente:', data);
        })*/
        const data = await response.json();

        if (response.ok) {
            console.log('Pedido y Orden creados correctamente:', data);
            //window.location.assign(`/persona/panel-te/${dniP}`)
            window.location.href= `/persona/panel-te/${dniP}`
        } else {
            console.error('Error al crear Pedido y Orden:', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }


})
