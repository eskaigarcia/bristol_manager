document.addEventListener('DOMContentLoaded', async () => {
    const node = document.getElementById('profesor');
    if (!node) return;

    // Add default option
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Cualquier profesor';
    node.appendChild(defaultOpt);

    try {
        const response = await fetch('./resources/grupos/getTeacherSelector.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const teachers = await response.json();
        teachers.forEach(teacher => {
            const option = document.createElement('option');
            // If teacher is a string, use as name, else use id_profesor/nombre
            if (typeof teacher === 'string') {
                option.textContent = teacher;
                option.value = teacher;
            } else {
                option.textContent = teacher.nombre;
                option.value = teacher.id_profesor;
            }
            node.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching teacher selector:', error);
    }
});



async function getTeachersForNG () {
    const node = document.getElementById('ng_profesor');
    if (!node) return;

    // Add default option
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = '-- Selecciona profesor --';
    node.appendChild(defaultOpt);

    try {
        const response = await fetch('./resources/grupos/getTeacherSelector.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const teachers = await response.json();
        teachers.forEach(teacher => {
            const option = document.createElement('option');
            // If teacher is a string, use as name, else use id_profesor/nombre
            if (typeof teacher === 'string') {
                option.textContent = teacher;
                option.value = teacher;
            } else {
                option.textContent = teacher.nombre;
                option.value = teacher.id_profesor;
            }
            node.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching teacher selector:', error);
    }
}