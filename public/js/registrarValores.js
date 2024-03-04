document.addEventListener("DOMContentLoaded", function() {

const btnGuardar= document.getElementById('guardarResult')
const rol= document.getElementById('rol').value

btnGuardar.addEventListener('click', async ()=>{
   alert("halsalas") 
    let inputs = document.querySelectorAll('.inputDet')
    let id_e= document.getElementById('id_examen').value
    const idOrden= document.getElementById('idOrden').value
//    const ex_estado= document.getElementById('exaEstado')

const verificar= await fetch(`/cambio_estado/camEstadoValidar/${idOrden}/${id_e}`)
                const response = await fetch(`/examen/examenes/cambioEstado/ex/${id_e}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                  
                });
    await inputs.forEach((i)=>{
         fetch('/guardar-valores',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               id_determinacion: i.id,
               id_examen: id_e,
               valor: i.value

            })
        }).then(res=>{
            if (res.ok) {
                
                 window.location.href=`/orden/orden-id/${idOrden}/${rol}`
                
            } else {
                console.error(`Error al actualizar `);
            }
        })
      
    })




})

})