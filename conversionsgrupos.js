// Conversión medias horas
// Conversión de horas a medias horas antes de enviar el formulario
console.log('JS cargado');
document.addEventListener('DOMContentLoaded', function() {
    var form = document.forms['insgrupo'];
    var selectHoras = document.getElementById('horasSemanales');

    if (form && selectHoras) {
        form.addEventListener('submit', function() {
            var horas = selectHoras.value;
            var mediasHoras = parseFloat(horas) * 2;
            console.log('Antes:', horas, 'Después:', mediasHoras);
            selectHoras.value = mediasHoras;
        });
    }
});