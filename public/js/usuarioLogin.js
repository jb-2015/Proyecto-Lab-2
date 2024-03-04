document.addEventListener('DOMContentLoaded', () => {

document.getElementById('frm-crear-usuario').addEventListener('submit', async (e) => {
    e.preventDefault();


const dni = document.getElementById('dni').value;
const clave = document.getElementById('clave').value;
const rol = document.getElementById('rol').value;
//const estado = document.getElementById('estado').checked ? 1 : 0;


try {

    const busquedaDni= await fetch(`/persona/urldni/${dni}`)


const esDniEncontrado = await busquedaDni.json();
if (!esDniEncontrado) {
    alert('Primero carga los datos de la persona en la base de datos.');

    return; 
}
    const response =  await fetch('/usuario/guardarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dni,
            clave,
            rol
            //estado
        })
    });

    const data = await response.json();

    if (response.ok) {
     
       document.getElementById('dni').value = '';
document.getElementById('clave').value = '';
//document.getElementById('rol').value = '';
        alert('Usuario creado correctamente')
        window.location.href='/page-Gerente'
    } else {
        document.getElementById('clave').value = '';
        alert('El Usuario ya tiene una cuenta');
    }

} catch (error) {
    console.error('Error:', error);
}
})

//document.getElementById('estado').checked = false;

});