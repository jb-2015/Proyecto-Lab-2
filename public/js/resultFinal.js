const btnImprimir= document.getElementById("btnImprimir");

btnImprimir.addEventListener("click",() =>{

alert('Please')

    var contenido = document.getElementById('contenido-a-imprimir').innerHTML;
    var ventanaImpresion = window.open('', '_blank');
    ventanaImpresion.document.write('<html><head><title>Imprimir</title></head><body>');
    ventanaImpresion.document.write(contenido);
    ventanaImpresion.document.write('</body></html>');
    ventanaImpresion.document.close();
    ventanaImpresion.print();


});
