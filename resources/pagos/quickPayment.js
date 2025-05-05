function triggerQuickPayment() {
    if (!quickPaymentTrigger) {
        quickPaymentTrigger = true;
        const confirmationDisplay = document.createElement('div');
        confirmationDisplay.id = 'confirmationDisplay';
        confirmationDisplay.className = 'full center';

        const submitButton = document.createElement('div');
        submitButton.id = 'submitButton';
        submitButton.className = 'full center';

        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = 'Registrar';

        submitButton.appendChild(button);

        const quickPayment = document.getElementById('quickPayment');
        quickPayment.appendChild(confirmationDisplay);
        quickPayment.appendChild(submitButton);
    }

    let name = document.getElementById('qp_alumno').value;
    let group = document.getElementById('qp_grupo').options[document.getElementById('qp_grupo').selectedIndex].text;
    let money = (parseFloat(document.getElementById('qp_precio').value) - parseFloat(document.getElementById('qp_descuento'))).toFixed(2) + '€';
    let month = new Date(document.getElementById('qp_fecha').value).toLocaleString('es-ES', { month: 'long' });

    if (name == '') name = '¿Alumno?'
    if (group == 'Seleccione un grupo') group = '¿grupo?'
    if (money == 'NaN€') money = '¿€?' 

    document.getElementById('confirmationDisplay').innerHTML = (
        `<p>
            ${name} paga ${money} por ${group} ${month}
        </p>`
    );
}