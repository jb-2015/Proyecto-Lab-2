document.addEventListener("DOMContentLoaded", function() {
const seleccionador = document.getElementById("analisisList");
const muestraSolicitadas = document.getElementById("muestrasSolicitadas");
const listAnalisis = document.getElementById("listAnalisis");

const fechaActual = new Date().toISOString().split('T')[0];

// Establecer la fecha actual como el valor predeterminado del campo de fecha
document.getElementById('fecha_creacion').value = fechaActual;

const rol = document.getElementById("rol").value;
let estadoOrden;
let contador = 0;
let contaAna = 0;
let verifi = true;
const estadosCheckboxes = [];
seleccionador.addEventListener("change", async () => {
  if (contador > contaAna) {
    contador--;
    alert("entrando 1 " + contador);
  }
  const id = seleccionador.value;

  await fetch(`/analisis/buscar-id/${id}`)
    .then((res) => res.json())
    .then((dato) => {
      contaAna++;
      console.log(dato);
      let sp = document.createElement("span");
      sp.classList.add("itemAnalisis");
      sp.classList.add("c1");
      sp.classList.add("f-column");
      sp.valueOf = dato.analisis.id_analisis;
      let div = document.createElement("div");
      div.classList.add("f-row");
      let lbl = document.createElement("h4");
      lbl.innerText = dato.analisis.descripcion;
      let close = document.createElement("h3");
      close.classList.add("crossClose");
      close.innerHTML = "&#10006";
      close.addEventListener("click", function () {
        contaAna--;
        if (contador != 0 && verifi) {
          contador--;
        } else if (contador > contaAna) {
          contador--;
          alert("entrando2 " + contador);
        }
      });
      div.appendChild(close);
      div.appendChild(lbl);

      sp.appendChild(div);

      const textMuestras = document.createElement("h4");
      textMuestras.innerText = "Muestras";
      const lista = document.createElement("ul");
      lista.classList.add("muestraAnalisis");
      lista.style.listStyle = "none";

      sp.appendChild(textMuestras);
      sp.appendChild(lista);

      //AGREGAMOS LA MUESTRA A LA LISTA DE MUESTRAS DENTRO DE CADA ANALISIS

      dato.muestras.forEach((m) => {
        let li = document.createElement("li");
        let h2 = document.createElement("h2");

        li.classList.add("f-row");

        h2.innerText = m.g_descripcion;
        li.appendChild(h2);
        li.id = m.id_guiaM;

        let inp = document.createElement("input");
        inp.type = "checkbox";

        inp.id = m.id_guiaM;

        inp.addEventListener("change", async (event) => {
          const checkbox = event.target;
          if (checkbox.checked) {
            contador++;
            estadosCheckboxes[contaAna] = contador;
          } else {
            contador--;
            estadosCheckboxes[contaAna] = contador;
          }
     
        });

        li.appendChild(inp);

        lista.appendChild(li);
      });

      // *************************JUAN BECERRA*****************************

      listAnalisis.appendChild(sp);

      close.addEventListener("click", () => {
        listAnalisis.removeChild(sp);
      });
    });
});

const btn_crear = document.getElementById("btncrear");
const btn_jugar = document.getElementById("btnJugar");
 const prioridad = document.getElementById("prioridad");
btn_jugar.addEventListener("click", () => {
 
});


btn_crear.addEventListener("click", async () => {
    if (contador == 0 && contaAna == 0) {
        alert("Por favor seleccione un analisis a realizar");
      } else {
        if (estadosCheckboxes[contaAna] == contaAna) {
          estadoOrden = 2;
          alert("Analitica " + estadoOrden);
        } else if (estadosCheckboxes[contaAna] != contaAna) {
          estadoOrden = 1;
          alert("Esp.. toma " + estadoOrden);
        }
      }
  const dniP = document.getElementById("dni_persona").value;
  const idp = document.getElementById("id_persona").value;
  const diagnostico = document.getElementById("diagnostico").value;
  const nombre_medico = document.getElementById("nombre_medico").value;
  const nro_matricula = document.getElementById("nro_matricula").value;
  const id_analisis = document.getElementById("analisisList").value;
  const fechacreacion = document.getElementById("fecha_creacion").value;
  const fechaEntrega = document.getElementById("fecha_entrega").value;
  const valorPrioridad = prioridad.checked ? 1 : 0;

  //const prioridad = document.getElementById("prioridad").value;
  // const estadoOrden = document.getElementById('estado_orden').value
  
  //OBTENER EL LISTADO DE ANALISIS que se van a realizar
  let listaAnalisis = document.querySelectorAll(".itemAnalisis");

  if (!diagnostico || !nombre_medico || !nro_matricula || !fechaEntrega) {
    alert("Por favor, complete todos los campos antes de continuar.");

  } else {
  let ids_analisis = Array.from(listaAnalisis).map((la) => {
    return la.valueOf;
  });

  //***************************************************** */

  //RECUPERAR MUESTRAS Y SI HAN SIDO PRESENTADAS O NO

  //listAnalisis = Array.from(listaAnalisis)

  let arrayAnalisisMuestra = [];

  listaAnalisis.forEach((la) => {
    let ms = la.querySelectorAll("li");

    let arrayMuestras = [];
    ms.forEach((lm) => {
      let status = lm.querySelector("input");
      status = status.checked;
      arrayMuestras.push({
        dato: lm.id,
        entregado: status,
      });
    });

    arrayAnalisisMuestra.push({
      id_analisis: la.valueOf,
      muestras: arrayMuestras,
    });
  });

  //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/


 
  /*fetch(`/pedido/creaPedido/${idp}/${diagnostico}/${nombre_medico}/${nro_matricula}/${id_analisis}/${fechacreacion}`)*/
  try {
    const response = await fetch("/pedido/creaPedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idp,
        diagnostico: diagnostico,
        nombre_medico: nombre_medico,
        nro_matricula: nro_matricula,
        fechacreacion: fechacreacion,
        fechaEntrega: fechaEntrega,
        valorPrioridad:valorPrioridad,
        estado_orden: estadoOrden,
        analisisMuestras: arrayAnalisisMuestra,
      }),
    });
    /*response.then(res=>res.json())
        .then(data=>{
            console.log('Pedido y Orden creados correctamente:', data);
        })*/
    const data = await response.json();

    if (response.ok) {
      console.log("Pedido y Orden creados correctamente:", data);
      //window.location.assign(`/persona/panel-te/${dniP}`)
      window.location.href = `/persona/panel-te/${dniP}/${rol}`;
    } else {
      console.error("Error al crear Pedido y Orden:", data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  
}
});

});
