function getStudentDetails(id) {
    fetch(`./resources/getStudentDetails.php?id=${id}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
}

function displayStudentDetails() {
    return 0;
}