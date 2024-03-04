

const btnEntrarUser= document.getElementById('entrar-personal')
const btnCambiarClave= document.getElementById('cambiarClaves')



btnCambiarClave.addEventListener('click',()=> {
  // Redirige al usuario a la página de restablecimiento
    window.location.assign(`/usuario/reseteo_password`); 
  });


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
     if (data.error === "Contraseña incorrecta") {
     console.log(data)
        document.getElementById(`errorclave`).textContent = data.error;

     }else if(data.error === "Documento no esta registrado"){
        document.getElementById(`errordni`).textContent = data.error;
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
