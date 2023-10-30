
const btnRegistroUser= document.getElementById('registrar-personal')
const btnEntrarUser= document.getElementById('entrar-personal')

btnRegistroUser.addEventListener('click', ()=>{
    window.location.assign(`/usuario/formularioUsuario`);
})

btnEntrarUser.addEventListener('click', async()=>{
    const dni = document.getElementById('dniId').value;
    const clave = document.getElementById('claveId').value;

    
    try {
        const response =  await fetch('/usuario/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                dni:dni,
                clave:clave
            })
        });
      
        const data = await response.json();
       
        if (data.ok) {
            if (data.redirectTo) {
                
                window.location.href = data.redirectTo;
              
            } else {
                alert('Eres paciente, se te va redireccionar')
                window.location.href='/portal-paciente'
            }
 
        }
    } catch (error) {
        console.error('Error:', error);
    }
    
})

