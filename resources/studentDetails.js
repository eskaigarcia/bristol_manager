function getStudentDetails(id) {
    fetch(`./resources/getStudentDetails.php?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Alumno no encontrado");
            return response.json();
        })
        .then(data => displayStudentDetails(data))
        .catch(error => console.error("Error:", error.message));
}

function displayStudentDetails(student) {
    console.log(student);
}

function toggleIBAN() {
    const field = document.getElementById('IBANField');
    const button = document.getElementById('IBANButton');

    if (field.type == 'text') {
        field.type = 'password';
        button.innerText = 'Mostrar';
    } else { 
        field.type = 'text'
        button.innerText = 'Ocultar';
    } 
}

function deleteDetailsModal() {
    document.getElementById('studentDataModal').remove()
}