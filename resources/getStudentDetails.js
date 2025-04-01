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