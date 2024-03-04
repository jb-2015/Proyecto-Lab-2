// Obtener los valores originales de los campos
document.addEventListener("DOMContentLoaded", function () {
  const diagnostico_original_value =
    document.getElementById("diagnostico2").value;
  const nombre_medico_original_value =
    document.getElementById("nombre_medico2").value;
  const nro_matricula_original_value =
    document.getElementById("nro_matricula2").value;
  const idOrden = document.getElementById("id_orden2").value;

  const seleccionador = document.getElementById("analisisList2");
  const muestraSolicitadas = document.getElementById("muestrasSolicitadas2");
  const listAnalisis = document.getElementById("listAnalisis2");
  const rol = document.getElementById("rol").value;
  // Obtener todos los elementos checkbox dentro de la lista de análisis
  let estadoOrden;
  let contador = 0;
  let contaAna = 0;
  let verifi = true;
  const estadosCheckboxes = [];
  const idMuestra = [];
  const entregadoMuestra = [];
  let contMT = 0;
  let contMT2 = 0;
  let contMT3 = 0;
  let idExa = []; // Obtener el valor del input
  let idestadoCambio;
  const checkboxes = document.querySelectorAll(
    '#listAnalisis23 input[type="checkbox"]'
  );
  // Iterar sobre cada checkbox
  checkboxes.forEach((checkbox) => {
    // Agregar un evento change a cada checkbox
    checkbox.addEventListener("change", async (event) => {
      // Obtener el ID del checkbox seleccionado
      const listItem2 = event.target.closest("#listAnalisis23");

      if (listItem2) {
        // Buscar los inputs dentro del elemento contenedor
        const inputs2 = listItem2.querySelectorAll("input");
        let valorMuestra2;
        let valorEXA;

        inputs2.forEach((input) => {
          if (input.type === "hidden" && input.value) {
            if (!valorEXA) {
              valorEXA = input.value;
              // console.log('Valor del id Examen:', valorAnalisis);
            } else {
              valorMuestra2 = input.value;
              //console.log('Valor de la muestra:', valorMuestra);
            }
          }
        });
        idExa[contMT3] = valorEXA;
        console.log('extra ',idExa[contMT3]+' contador'+contMT3)
        contMT3++;
        
      } else {
        console.error(
          "No se encontró el elemento contenedor con ID listAnalisis23"
        );
      }
      if (event.target.checked) {
        const idCheckbox = event.target.id;

        console.log("ID del checkbox seleccionado:", idCheckbox);
        const valor = 1;
        idestadoCambio = 2;
        console.log("El checkbox fue marcado. Valor:", valor);
        idMuestra[contMT] = idCheckbox;

        entregadoMuestra[contMT2] = valor;
        contMT++;
        contMT2++;
      } else {
        // El checkbox fue desmarcado
        const idCheckbox = event.target.id;

        console.log("ID del checkbox seleccionado:", idCheckbox);
        const valor = 0;
        idestadoCambio = 1;
        console.log("El checkbox fue desmarcado.", valor);

        idMuestra[contMT] = idCheckbox;
        entregadoMuestra[contMT2] = valor;
        contMT++;
        contMT2++;
      }
     
    });
  });

  const marianoCloseElements = document.querySelectorAll(".crossCloseB");
  marianoCloseElements.forEach((closeElement) => {
    /*
    closeElement.addEventListener("click", async (event) => {
         const listItem = event.target.closest(".itemAnalisis2");
      const confirmacion = window.confirm(
        "¿Estás seguro de que deseas borrar?"
      );
      if (confirmacion) {
       
        if (listItem) {
          // Obtener todos los elementos <input> dentro de listItem
          const inputs = listItem.querySelectorAll("input");

          // Iterar sobre los inputs para encontrar los valores deseados
          let valorMuestra3;
          let valorAnalisis;
          inputs.forEach((input) => {
            if (input.type === "hidden" && input.value) {
              if (!valorAnalisis) {
                valorAnalisis = input.value;
              }} else  {
                valorMuestra3 = input.value;
            
        
            }
          });
          console.log(valorAnalisis+ 'a ----- m'+valorMuestra3)
          */
          closeElement.addEventListener("click", async (event) => {
            const listItem = event.target.closest(".itemAnalisis2");
            const confirmacion = window.confirm("¿Estás seguro de que deseas borrar?");
            if (confirmacion) {
                if (listItem) {
                    const idExaM2 = listItem.querySelector(".idExa").getAttribute("data-idexa");
                    const idMuestra = listItem.querySelector(".idMuestra").getAttribute("data-idmuestra");
    
                    console.log(`ID Examen: ${idExaM2}, ID Muestra: ${idMuestra}`);

          try {
            // Eliminar el examen
            const responseExamen = await fetch(`/examen/examenes/delet/${idExaM2}`,
              {
                method: "DELETE",
              }
            );

            if (!responseExamen.ok) {
              throw new Error("No se pudo eliminar el examen");
            }

            // Eliminar el cambio de estado
            const responseCambioEstado = await fetch(`/cambio_estado/delet/${idExaM2}`,
              {
                method: "DELETE",
              }
            );

            if (!responseCambioEstado.ok) {
              throw new Error("No se pudo eliminar el cambio de estado");
            }
            const responseMuestra = await fetch(
              `/muestra/delet/${idMuestra}`,
              {
                method: "DELETE",
              }
            );

            if (!responseMuestra.ok) {
              throw new Error("No se pudo eliminar la muestra");
            }

            alert("Examen y cambio de estado eliminados correctamente");
          } catch (error) {
            console.error(
              "Error al intentar eliminar el examen o el cambio de estado:",
              error
            );
          }

          listItem.remove();
        }
      }
    });
  });

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
  const checkbox = document.getElementById('prioridad2');
    
  // Variable para almacenar el estado anterior del checkbox
  let estadoAnterior = checkbox.checked ? 1 : 0;
  let valorPriori=estadoAnterior;
  // Agregar un evento change al checkbox
  checkbox.addEventListener('change', function() {
      // Obtener el nuevo estado del checkbox
      const estadoActual = this.checked ? 1 : 0;
    
      // Verificar si el estado anterior es diferente al nuevo estado
      if (estadoAnterior !== estadoActual) {
          console.log('El estado del checkbox ha cambiado a:', estadoActual);
          
          // Realizar la actualización u otra acción aquí
          valorPriori=estadoActual
          // Actualizar el estado anterior con el nuevo estado
          estadoAnterior = estadoActual;
      }
  });
  const btn_crear = document.getElementById("btncrear2");
  const btn_jugar = document.getElementById("btnJugar2");


  
  btn_jugar.addEventListener("click", async () => {
   
  });






  btn_crear.addEventListener("click", async () => {

    if (contador == 0 && contaAna == 0) {
      alert("Por favor seleccione un analisis a realizar");
    } else {
      if (estadosCheckboxes[contaAna] == contaAna) {
        estadoOrden = 2;

        //////////cambio de estado
        //await fetch(`/cambio_estado/camEstadoAnaOesp/${idExa}/${estadoOrden}`)
        alert("Analitica " + estadoOrden);
      } else if (estadosCheckboxes[contaAna] != contaAna) {
        estadoOrden = 1;
        // await  fetch(`/cambio_estado/camEstadoAnaOesp/${idExa}/${estadoOrden}`)
        alert("Esp.. toma " + estadoOrden);
      }
    }

    const idPedido = document.getElementById("id_pedido2").value;
    const diagnostico = document.getElementById("diagnostico2").value;
    const nombre_medico = document.getElementById("nombre_medico2").value;
    const nro_matricula = document.getElementById("nro_matricula2").value;

    try {
      const originalData = {
        diagnostico: diagnostico_original_value,
        nombre_medico: nombre_medico_original_value,
        nro_matricula: nro_matricula_original_value,
      };

      const modifiedData = {
        diagnostico: diagnostico,
        nombre_medico: nombre_medico,
        nro_matricula: nro_matricula,
      };

      if (JSON.stringify(originalData) !== JSON.stringify(modifiedData)) {
        const response = await fetch(`/pedido/update/${idPedido}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modifiedData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(`Datos actualizados correctamente para ID ${idPedido}`);
          window.location.reload();
        } else {
          console.error(`Error al actualizar los datos para ID`);
        }
      } else {
        console.log("No se realizaron cambios en los datos.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    for (let i = 0; i < contMT; i++) {
      if (i == 0) {
        try {
          const responseMuestra = await fetch(
            `/muestra/update/${idMuestra[i]}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                entregado: entregadoMuestra[i],
              }),
            }
          );

          const dataMuestra = await responseMuestra.json();

          if (responseMuestra.ok) {
            console.log(
              `Datos actualizados correctamente para ID ${idMuestra[i]}`
            );
            if (idExa != 0) {
              // Realizar el segundo fetch
              console.log(
                "id_estado",
                idestadoCambio,
                "id_Examen:",
                idExa,
                " id_orden " + idOrden
              );
              const responseEstado = await fetch(
                `/cambio_estado/camEstadoAnaOesp/${idestadoCambio}/${idOrden}/${idExa[i]}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const dataEstado = await responseEstado.json();

              if (responseEstado.ok) {
                console.log("Cambio de estado realizado con éxito.");
              } else {
                console.error(
                  "Error al realizar el cambio de estado:",
                  dataEstado.error
                );
              }
            }
          } else {
            console.error(
              `Error al actualizar los datos para ID ${idMuestra[i]}: ${dataMuestra.error}`
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        try {
          const responseMuestra = await fetch(
            `/muestra/update/${idMuestra[i]}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                entregado: entregadoMuestra[i],
              }),
            }
          );

          const dataMuestra = await responseMuestra.json();

          if (responseMuestra.ok) {
            console.log(
              `Datos actualizados correctamente para ID ${idMuestra[i]}`
            );
            if (idExa != 0) {
              // Realizar el segundo fetch
              console.log(
                "id_estado",
                idestadoCambio,
                "id_Examen:",
                idExa,
                " id_orden " + idOrden
              );
              const responseEstado = await fetch(
                `/cambio_estado/camEstadoAnaOesp/${idestadoCambio}/${idOrden}/${idExa[i]}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const dataEstado = await responseEstado.json();

              if (responseEstado.ok) {
                console.log("Cambio de estado realizado con éxito.");
              } else {
                console.error(
                  "Error al realizar el cambio de estado:",
                  dataEstado.error
                );
              }
            }
          } else {
            console.error(
              `Error al actualizar los datos para ID ${idMuestra[i]}: ${dataMuestra.error}`
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }

    contMT = 0;
    contMT2 = 0;
    contMT3 = 0;

    //const idp=document.getElementById('id_persona2').value
    //const idPedido = document.getElementById("id_pedido2").value;
    //  const diagnostico=document.getElementById('diagnostico2').value
    // const nombre_medico=document.getElementById('nombre_medico2').value
    //  const nro_matricula=document.getElementById('nro_matricula2').value
    // const id_analisis=document.getElementById('analisisList2').value
    const fechacreacion=document.getElementById('fecha_creacion2').value
    const fechaEntrega=document.getElementById('fecha_entrega2').value
    
    //const estadoOrden = document.getElementById('estado_orden2').value
    //const valorPrioridad = prioridad.checked ? 1 : 0;
    //OBTENER EL LISTADO DE ANALISIS que se van a realizar
    let listaAnalisis = document.querySelectorAll(".itemAnalisis");

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

    console.log("a= " + arrayAnalisisMuestra);
console.log('bbb '+valorPriori)
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

    /*fetch(`/pedido/creaPedido/${idp}/${diagnostico}/${nombre_medico}/${nro_matricula}/${id_analisis}/${fechacreacion}`)*/
    try {
      const response = await fetch("/orden/ordenExa/crearOrden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPedido: idPedido,
          //diagnostico: diagnostico,
          // nombre_medico: nombre_medico,
          //nro_matricula: nro_matricula,
          fechacreacion: fechacreacion,
          fechaEntrega:fechaEntrega,
          valorPrioridad:valorPriori,
          estadoOrden: estadoOrden,
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
        //window.location.href= `/persona/panel-te/${dniP}/${rol}`
        //     window.location.href=`/page_orden/create/${idOrden}/${rol}`
        // window.location.reload();
      } else {
        console.error("Error al crear Pedido y Orden:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  
 
  const btnPrueba = document.getElementById("btnprueba");
  
  btnPrueba.addEventListener("click", function (event) {
alert(valorPriori)
  })

});
