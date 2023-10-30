/////////////////////////////////////////////PACIENTE LIGIN /////////////////////////////////////////////////////////
const btnPaciente= document.getElementById('btnPaciente')

btnPaciente.addEventListener('click', async()=>{
    const dni = document.getElementById('dni-paciente').value;
    const clave = document.getElementById('clave-paciente').value;

    
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
       
        if (data.ok) {
            if (data.redirectTo) {
                
                window.location.href = data.redirectTo;
              
            } else {
                alert('Eres Personal, se te va redireccionar')
                window.location.href='/portal-personal'
            }
 
        } else {
            console.error('Error al crear Usuario:', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    document.getElementById('dni-paciente').value = '';
    document.getElementById('clave-paciente').value = '';
})