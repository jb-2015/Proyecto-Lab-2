// Objeto para almacenar los valores de los campos de entrada
const valoresCambiantes = {};
const idOrden= document.getElementById('idOrden').value;
// Agregar evento change a los campos de entrada
const inputDetList = document.querySelectorAll('.inputDet');
inputDetList.forEach(inputDet => {
    inputDet.addEventListener('change', (event) => {
        const idDeterInput = event.target.id;
        const nuevoValor = event.target.value;

        // Almacenar el nuevo valor en el objeto
        valoresCambiantes[idDeterInput] = nuevoValor;

        console.log("Id de Determinacion cambiado:", idDeterInput);
        console.log("Nuevo Valor:", nuevoValor);
    });
});

document.getElementById('guardarValor').addEventListener('click', async () => {
    // Utilizar los valores almacenados al hacer clic en el botón "Guardar"
    let id_e= document.getElementById('id_examen').value
    const verificar= await fetch(`/cambio_estado/camEstadoValidar/${idOrden}/${id_e}`)
    const respon = await fetch(`/examen/examenes/cambioEstado/ex/${id_e}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
      
    });
    for (const idDeterInput in valoresCambiantes) {
        const nuevoValor = valoresCambiantes[idDeterInput];

        try {
            const response = await fetch(`/registrovalor/update/${idDeterInput}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    valor: nuevoValor,
                })
            });

            const data = await response.json();

            if (response.ok) {
              
                window.location.href='/page-Tecnico'
                //window.location.href= `/orden/orden-idPreInfo/${idOrden}`
                console.log(`Datos actualizados correctamente para ID ${idDeterInput}`);
            } else {
                console.error(`Error al actualizar los datos para ID ${idDeterInput}: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});
