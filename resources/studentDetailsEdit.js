const storage = {
    activeStudent: 0,
    pendingEdits: false,
    studentData: null,
}

function removeDetailsModal() {
    if (pendingEdits) {
        alert('No guardaste cambios.')
    } else {
        document.getElementById('studentDataModal').remove()
    }
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

function toggleIBAN2() {
    const field = document.getElementById('IBANField2');
    const button = document.getElementById('IBANButton2');

    if (field.type == 'text') {
        field.type = 'password';
        button.innerText = 'Mostrar';
    } else { 
        field.type = 'text'
        button.innerText = 'Ocultar';
    } 
}

const quickNotes = {
    discard() {
        storage.pendingEdits = false;
        document.querySelector('#quickNotes textarea').innerText = storage.studentData.alumno.notasRapidas;
        document.querySelector('#quickNotes div').classList.add('hidden');
    },

    save() {
        // CURRENTLY BROKEN
        let notes = document.querySelector('#quickNotes textarea').innerText;
        let id = storage.activeStudent;
        
        fetch('./updateQuickNotes.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ notes, id }),
        })
        // .then(response => {
        //     if (!response.ok) throw new Error('Network response was not ok');
        //     return response.json();
        // })
        // .then(data => { console.log('Success:', data); })
        // .catch(error => { console.error('Error:', error); });

        document.querySelector('#quickNotes div').classList.add('hidden');
        storage.pendingEdits = false;
    },

    trigger() {
        storage.pendingEdits = true;
        document.querySelector('#quickNotes div').classList.remove('hidden');
    }
} 