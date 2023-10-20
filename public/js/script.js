

const btn_personal= document.getElementById('entrar-personal')
const btn_buscarP= document.getElementById('buscarPaciente')


/*
btn_personal.addEventListener('click',()=>{
    window.location.assign('/page-administrativo')
})*/

btn_buscarP.addEventListener('click',  ()=>{
  
    let valor = document.getElementById('dni-paciente-search').value   

    //window.location.assign(`persona/dni/${valor}`)
     
if(valor){
          window.location.href = `/persona/panel-te/${valor}`;
}else{
          crearPersona.style.display = 'inline';
}
   // fetch('./panel-paciente') 35765481
   
  

})







