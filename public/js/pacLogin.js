/////////////////////////////////////////////PACIENTE LIGIN /////////////////////////////////////////////////////////
const btnPaciente= document.getElementById('btnPaciente')

btnPaciente.addEventListener('click', async()=>{
    const dni = document.getElementById('dniId').value;
    const clave = document.getElementById('claveId').value;

    
    try {
        const response =  await fetch('/usuario/pacienTe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dni,
                clave
            
            })
        });
      
        const data = await response.json();
        document.getElementById('errordni').textContent = '';
        document.getElementById('errorclave').textContent = '';
        if (data.ok) {
            if (data.redirectTo) {
            
                window.location.href = data.redirectTo;
              
            } else {
                alert('Eres Personal, se te va redireccionar')
                window.location.href='/portal-personal'
            }
            document.getElementById('dniId').value = '';
            document.getElementById('claveId').value = '';
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
    
})