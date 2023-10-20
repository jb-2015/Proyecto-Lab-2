const frm = document.getElementById("frm-nueva-persona");

frm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nombreInput = document.getElementById('nombre').value;
    const apellidoInput = document.getElementById('apellido').value;
    const dniInput = document.getElementById('dni').value;
    const fechaNacimientInput = document.getElementById('fecha_nacimient').value;
    const generoInput = document.getElementById('genero').value;
    const direccionInput = document.getElementById('direccion').value;
    const telInput = document.getElementById('tel').value;
    const emailInput = document.getElementById('email').value;

    try {
        const response = await fetch('/persona/create', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombreInput,
                apellido: apellidoInput,
                dni: dniInput,
                fecha_nacimient: fechaNacimientInput,
                genero: generoInput,
                direccion: direccionInput,
                tel: telInput,
                email: emailInput
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Persona creada correctamente:', data);
        } else {
            console.error('Error al crear persona:', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
