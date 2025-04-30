function getGroupDetails(id) {
    fetch(`./resources/grupos/getGroupDetails.php?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("No se pudieron cargar los detalles del grupo");
            return response.json();
        })
        .then(group => {
            if (group.error) {
                alert(group.error);
            } else {
                showGroupModal(group);
            }
        })
        .catch(error => {
            alert(error.message);
            console.error(error);
        });
}

function showGroupModal(group) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style = 'background: white; padding: 20px; border: 1px solid black; max-width: 400px; margin: 20px auto;';
    modal.innerHTML = `
        <h3>Detalles del Grupo</h3>
        <p><strong>Modalidad:</strong> ${group.modalidad}</p>
        <p><strong>Intensivo:</strong> ${group.esIntensivo == 1 ? 'Sí' : 'No'}</p>
        <p><strong>Activo:</strong> ${group.esActivo == 1 ? 'Sí' : 'No'}</p>
        <p><strong>Horario:</strong> ${group.horario}</p>
        <button onclick="this.parentElement.remove()">Cerrar</button>
    `;
    document.body.appendChild(modal);
}
