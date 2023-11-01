
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
    
       
        document.getElementById('errordni').textContent = '';
        document.getElementById('errorclave').textContent = '';
        if (data.ok) {
            if (data.redirectTo) {
                
                window.location.href = data.redirectTo;
              
            } else {
                alert('Eres paciente, se te va redireccionar')
                window.location.href='/portal-paciente'
            }
            document.getElementById('dniId').value='';
            document.getElementById('claveId').value='';
        }
         if (data.errores) {
            data.errores.forEach(error => {
                const campo = error.path;
                const mensaje = error.msg;
                // Mostrar mensaje de error en el campo correspondiente
                document.getElementById(`error${campo}`).textContent = mensaje;
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
    
    // Limpiar mensajes de error previos
  
 
})

