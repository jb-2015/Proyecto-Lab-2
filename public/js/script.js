const btn_personal= document.getElementById('entrar-personal')
const btn_buscarP= document.getElementById('buscarPaciente')



btn_personal.addEventListener('click',()=>{
    window.location.assign('/page-administrativo')
})

btn_buscarP.addEventListener('click',()=>{
    let valor = document.getElementById('dni-paciente-search')   

    fetch(`persona/dni/:${valor.value}`,{
       
    })
    .then(res=>res.json())
    .then(d=>{

    })
    .catch(error =>{
        console.log("Error: "+error)
    })
})
