

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