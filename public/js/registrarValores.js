const btnGuardar= document.getElementById('guardarResult')


btnGuardar.addEventListener('click', ()=>{
    let inputs = document.querySelectorAll('.inputDet')
    let id_e= document.getElementById('id_examen').value

    inputs.forEach((i)=>{
         fetch('/guardar-valores',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               id_determinacion: i.id,
               id_examen: id_e,
               valor: i.value

            })
        }).then(res=>{
            if(res.OK){
                console.log("YES!")
            }
        })
    })




})