const btnVerificar= document.getElementById('verificar')
const btnValidar= document.getElementById('btnParaValidar')
const btnInformar= document.getElementById('btnInformar')

btnInformar.addEventListener('click', async()=>{
  let id_e= document.getElementById('id_examen').value
  const idOrden= document.getElementById('id_orden').value
  const idestadoCambio= 5;

  const responseEstado = await fetch(`/cambio_estado/camEstadoAnaOesp/${idestadoCambio}/${idOrden}/${id_e}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const dataEstado = await responseEstado.json();

  if (responseEstado.ok) {
    console.log("Cambio de estado realizado con éxito.");
    window.location.href='/page-Bioquimico'
  } else {
    console.error(
      "Error al realizar el cambio de estado:",
      dataEstado.error
    );
  }
})

btnVerificar.addEventListener('click', async ()=>{
  let id_e= document.getElementById('id_examen').value
    const idorden= document.getElementById('id_orden').value

console.log('clickeaste')
   const verificar= await fetch(`/cambio_estado/cambiarEstado/${idorden}`)
   const response = await fetch(`/examen/examenes/cambioEstadoAcero/exEstadoCero/${id_e}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
  
});

if(verificar){
    window.location.href='/page-bioquimico'

}else{
  console.log('no se pudo efectuar el cambio de estado')  
}

})

btnValidar.addEventListener('click', async ()=>{
alert("Ver")
  const idorden= document.getElementById('id_orden').value

console.log('clickeaste')
 const verificar= await fetch(`/cambio_estado/camEstadoValidar/${idorden}`)

if(verificar){
  window.location.href='/page-Tecnico'

}else{
console.log('no se pudo efectuar el cambio de estado')  
}

})