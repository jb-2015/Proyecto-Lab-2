const frm = document.getElementById("frm-datos-paciente");

frm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const idPersonaInput = document.getElementById('id_persona').value;
    const nombreInput = document.getElementById('nombre').value;
    const apellidoInput = document.getElementById('apellido').value;
    const fechaNacimientInput = document.getElementById('fecha_nacimient').value;
    const generoInput = document.getElementById('genero').value;
    const direccionInput = document.getElementById('direccion').value;
    const telInput = document.getElementById('tel').value;
    const emailInput = document.getElementById('email').value;

    try {
        const response = await fetch(`/persona/update/${idPersonaInput}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombreInput,
                apellido: apellidoInput,
                fecha_nacimient: fechaNacimientInput,
                genero: generoInput,
                direccion: direccionInput,
                tel: telInput,
                email: emailInput
            })
        });

        const data = await response.json();

        if (response.ok) {

            console.log('Datos actualizados correctamente:');
        } else {
            console.error('Error al actualizar los datos:');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});