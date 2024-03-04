
document.addEventListener("DOMContentLoaded", function() {
let notificationCount = 0;

function increaseNotificationCount() {
    notificationCount++;
    document.getElementById('notificationCount').innerText = notificationCount;
}



document.getElementById('notificationIcon').addEventListener('click', function() {
    clearNotificationCount();
    // Aquí puedes agregar código para mostrar las notificaciones
});



const btnDevo= document.getElementById('btnDevolucion')

btnDevo.addEventListener('click', ()=>{

    document.querySelector('.tContainer').style.display = 'none';
    document.querySelector('.tContainer2').style.display = 'block';

})

const btnPrincipal= document.getElementById('btnPrincipal')

btnPrincipal.addEventListener('click', ()=>{

    document.querySelector('.tContainer').style.display = 'block';
    document.querySelector('.tContainer2').style.display = 'none';

})
})