const btn_personal= document.getElementById('entrar-personal')
const btn_buscarP= document.getElementById('buscarPaciente')


/*
btn_personal.addEventListener('click',()=>{
    window.location.assign('/page-administrativo')
})*/

btn_buscarP.addEventListener('click',()=>{
    let valor = document.getElementById('dni-paciente-search').value   

    //window.location.assign(`persona/dni/${valor}`)
    /*
    fetch(`persona/dni/${valor}`)
    .then(res=>res.json())
    .then(d=>{
       if(!d){
            alert("no existe")
       }else{
          fetch('./routers/index/panelPaciente',{
              method:"POST",
              body: {data: d}
          })
       }
    })
    .catch(error =>{
        alert("no esta")
        console.log("Error: "+error)
        
    })*/
    fetch('./panel-paciente')
})
