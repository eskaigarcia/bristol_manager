const relMgr = {
    async testIsActiveStudent(id_relacion) {
        // Llamada AJAX para conseguir los IDs de alumnos
const response = await fetch(`./resources/relaciones/getFriendDetails.php?id=${id_relacion}`);
        const data = await response.json();

        const alumnos = data.alumnos;
        let output = [];

        for (let alumno of alumnos) {
            const activo = await relMgr._checkIfActive(alumno.id_alumno);
            output.push(`${alumno.nombre} ${alumno.apellidos}: ${activo ? 'Activo ✅' : 'Inactivo ❌'}`);
        }

        alert(output.join('\n'));
    },

    async _checkIfActive(id_alumno) {
        const nonce = Date.now() + '-' + Math.random();
        const res = await fetch("./components/libraries/testActiveStudent.php?q=" + encodeURIComponent(id_alumno) + "&nonce=" + nonce);
        const data = await res.json();

        return data.some(grp => !grp.fechaFin || new Date(grp.fechaFin) > new Date());
    },

    async testIsActiveStudentPrompt(id_relacion) {
        alert("Comprobando estado de los alumnos...");
        await relMgr.testIsActiveStudent(id_relacion);
    },

    async endFriendRelationshipConfirm(id_relacion) {
        const confirmEnd = confirm("¿Estás seguro de que quieres finalizar esta relación?");
        if (confirmEnd) {
            await fetch("./components/libraries/setExperiedFriendship.php?q=" + encodeURIComponent(id_relacion));
            alert("Relación finalizada.");
            location.reload();
        }
    }
};
