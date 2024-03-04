

const btn_personal= document.getElementById('entrar-personal')
const btn_buscarP= document.getElementById('buscarPaciente')
const btn_listaP= document.getElementById('listaPaciente')
const rol = document.getElementById('rol').value
/*
btn_personal.addEventListener('click',()=>{
    window.location.assign('/page-administrativo')
})*/
btn_listaP.addEventListener('click',()=>{
    window.location.href = `/usuario/listaPaciente/userPa/${rol}`;
})


btn_buscarP.addEventListener('click',  ()=>{
  
    let valor = document.getElementById('dni-paciente-search').value   
let email = document.getElementById('email-paciente-search').value


    //window.location.assign(`persona/dni/${valor}`)
     
if(valor){
          window.location.href = `/persona/panel-te/${valor}/${rol}`;

}else if(email){
    window.location.href = `/persona/porEmail/userEmail/${email}`;
}
else{
          crearPersona.style.display = 'inline';
}
   // fetch('./panel-paciente') 35765481
   
  

})







