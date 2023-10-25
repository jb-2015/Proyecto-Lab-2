const seleccionador= document.getElementById('analisisList')

seleccionador.addEventListener('change',()=>{
    
    const id = seleccionador.value

    fetch(`/muestra/obtenerMuestras/${id}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())
    .then(datos=>{
        console.log(datos)
    })

})