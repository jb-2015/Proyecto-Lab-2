const btnValidar= document.getElementById('btnParaValidar')

btnValidar.addEventListener('click', async ()=>{
   
      const idorden= document.getElementById('id_orden').value
    
    console.log('clickeaste')
     const verificar= await fetch(`/cambio_estado/camEstadoValidar/${idorden}`)
    
    if(verificar){
      window.location.href='/page-tecnico'
    
    }else{
    console.log('no se pudo efectuar el cambio de estado')  
    }
    
    })