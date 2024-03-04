document.addEventListener("DOMContentLoaded",  ()=> {

const btnValidar= document.getElementById('btnParaValidar')
const btnActualizar= document.getElementById('btnActualizar')
const btnCancelar= document.getElementById('btnCancelar')
const btnOrdTerminada= document.getElementById('btnOrdTerminada')
const cancelarOrdenInput = document.getElementById('cancelarOrden');
const dniP= document.getElementById('dni').value
const rol= document.getElementById('rol').value
//const idExa= document.getElementById('exalength').value
//const ite= document.getElementById('ite').value
    
/////////////////////// A L E R T A //////////////////////////
//Dejar en primer lugar la funcion etiqueta, sino, no funciona.
const btnEtiquetas = document.querySelectorAll('.btnEtiqueta');

btnEtiquetas.forEach(btnEtiqueta => {


    btnEtiqueta.addEventListener('click', (event) => {
      const index = event.target.value;
      console.log(index)
  // Crear un nuevo objeto jsPDF
  const doc = new jsPDF({
    orientation: 'portrait', // Orientación del documento (paisaje o retrato)
    unit: 'mm', // Unidad de medida (milímetros, por defecto)
    format: 'a4' , // Tamaño del documento (ancho y alto)
  });
  // Generar la etiqueta de muestra
  const Nombre = document.getElementById(`nombre_${index}`).value;
  const apellido = document.getElementById(`apellido_${index}`).value;
  const descripcionAnalisis =  document.getElementById(`analisis_${index}`).value;
  console.log(descripcionAnalisis)
  const idOrden= document.getElementById('idOrden').value
  const idOrdenAleatorio = Math.floor(Math.random() * 1000) + 1; // Generar un número aleatorio
  const fechaHoraRecogida = new Date().toLocaleString();
  const inicialesPersona = 'XX'; // Reemplazar por las iniciales reales

  // Construir el contenido del PDF
  const contenidoPDF = `
      [${Nombre} ${apellido}]
        N°:0000${idOrden}
  |||||||||||||||||||||||||||||||||||||||
 ${descripcionAnalisis}
    ${fechaHoraRecogida}
    
  `;

  // Agregar el contenido al PDF
    // Agregar borde y ajustar el tamaño de la fuente
    doc.setFontSize(10); // Tamaño de la fuente en puntos
    doc.rect(10, 10, 40, 22); // Agregar un rectángulo como borde
    doc.text(contenidoPDF, 10, 10); // Agregar el contenido al PDF
  // Descargar el PDF
  doc.save(`${Nombre}_${apellido}.pdf`);
});
});


btnCancelar.addEventListener('click', async () => {

    // Obtener el valor actual del input
    const idOrden= document.getElementById('idOrden').value
    
    const rol= document.getElementById('rol').value
    const valorActual = cancelarOrdenInput.value;

    // Verificar si el valor actual es 'true'
    if (valorActual === 'true') {
        // Establecer el valor del input en 'false'
        cancelarOrdenInput.value = 'false';
      const valor=0;
      try {
         const response= await fetch(`/orden/cancelarOrden/${idOrden}/${valor}`,{
          
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
         
         
           alert('La orden ha sido cancelada ' +idOrden);
           window.location.href = `/persona/panel-te/${dniP}/${rol}`;
        } else {
          console.error(
            "Error al realizar el cambio de estado:",
            data.error
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    

       

    } else {
      
        cancelarOrdenInput.value = 'true';
        const valor=1;
        try {
           const response= await fetch(`/orden/cancelarOrden/${idOrden}/${valor}`,{
            
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          const data = await response.json();
  
          if (response.ok) {
            console.log("Cambio de estado realizado con éxito.");
             alert('La orden ha sido activada' +idOrden);
             window.location.href = `/persona/panel-te/${dniP}/${rol}`;
          } else {
            console.error(
              "Error al realizar el cambio de estado:",
              data.error
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      
  
         
    }
});
btnActualizar.addEventListener('click', async ()=> {
  const idorden= document.getElementById('idOrden').value
 
  const rol= document.getElementById('rol').value

//alert('/actualizarOrden-id/:id/:rol'+rol+idorden) ///page-create-orden/:id_persona

//window.location.href=`/orden/actualizarOrden-id/${idorden}/${rol}`
window.location.href=`/page_orden/create/${idorden}/${rol}`

})




      if(rol === 'Tecnico'){
btnValidar.addEventListener('click', async ()=>{
   
      const idorden= document.getElementById('idOrden').value
    
    console.log('clickeaste')
     const verificar= await fetch(`/cambio_estado/camEstadoValidar/${idorden}`)
    
    if(verificar){
      window.location.href='/page-tecnico'
    
    }else{
    console.log('no se pudo efectuar el cambio de estado')  
    }
    
    })
}
btnOrdTerminada.addEventListener('click', async ()=>{

  const idorden= document.getElementById('idOrden').value
  const sexo= document.getElementById('sexo').value
  console.log(idorden,' - ',sexo);
  const idExamenesArray = [];
  const idExamenesElements = document.querySelectorAll("#id_examen");
  idExamenesElements.forEach(element => {
      idExamenesArray.push(element.value);
  });

  const data = {
      id_examenes: idExamenesArray.join(','), // Convertir el array en una cadena separada por comas
      genero: sexo,
      id_orden: idorden,
      rol:rol
  };
console.log(data);
try {
  window.location.href= `/determinacion/resultados-examenes/${idExamenesArray}/${sexo}/${idorden}/${rol}`;


// Manejar la respuesta del servidor


// Redirigir a la página resultFinal
//window.location.href = `/determinacion/resultFinal/${rol}`;
 
} catch (error) {
  console.error('Error:', error);
}
      })
  })


   