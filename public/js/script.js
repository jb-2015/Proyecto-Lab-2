const btn_personal= document.getElementById('entrar-personal')
const btn_buscarP= document.getElementById('buscarPaciente')


/*
btn_personal.addEventListener('click',()=>{
    window.location.assign('/page-administrativo')
})*/

btn_buscarP.addEventListener('click',()=>{
    let valor = document.getElementById('dni-paciente-search').value   

    //window.location.assign(`persona/dni/${valor}`)
    

          window.location.href = `/persona/panel-te/${valor}`;
     
   // fetch('./panel-paciente') 35765481
})











document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-datos');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const fechaNacimientoInput = document.getElementById('fecha_nacimiento');
    const generoInput = document.getElementById('genero');
    const direccionInput = document.getElementById('direccion');
    const telInput = document.getElementById('tel');
    const emailInput = document.getElementById('email');
    
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const nuevoNombre = nombreInput.value;
        const nuevoApellido = apellidoInput.value;
        const nuevaFechaNacimiento = fechaNacimientoInput.value;
        const nuevoGenero = generoInput.value;
        const nuevaDireccion = direccionInput.value;
        const nuevoTel = telInput.value;
        const nuevoEmail = emailInput.value;
        const dni = "<%= persona.dni %>"; 

        fetch(`/api/actualizar/${dni}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nuevoNombre,
                apellido: nuevoApellido,
                fecha_nacimiento: nuevaFechaNacimiento,
                genero: nuevoGenero,
                direccion: nuevaDireccion,
                tel: nuevoTel,
                email: nuevoEmail,
                dni: dni
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Actualizado correctamente') {
                alert('Datos actualizados correctamente');
            } else {
                alert('Hubo un error al actualizar los datos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al conectar con el servidor');
        });
    });
});
