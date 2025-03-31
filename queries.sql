-- ALUMNOS

    -- Visualización de tabla
        SELECT
            id,  
            apellidos, 
            nombre, 
            telefono, 
            dni, 
            email, 
            esAdulto,
            esAmonestado, 
            comentariosMedicos
        FROM alumnos
        WHERE 1                     -- Where clause must be built by PHP
        LIMIT 25 OFFSET 25


    -- Visualización de detalles
        SELECT                         -- ESTUDIANTE
            id, 
            apellidos, 
            nombre, 
            telefono, 
            dni, 
            email, 
            esAdulto,
            esAmonestado, 
            direccion,
            cp,
            localidad,
            iban,
            comentariosMedicos
        FROM alumnos
        WHERE id_alumno = $SEARCHID 

        SELECT                         -- RESPONSABLE LEGAL
            id,
            nombre, 
            apellidos,
            telefono,
            dni,
            email,
            direccion,
            cp,
            localidad,
            iban
        FROM responsables
        WHERE id_alumno = $SEARCHID

        SELECT                         -- CONTACTOS DE EMERGENCIA
            nombre,
            relacion,
            telefono
        FROM contactosemergencia
        WHERE id_alumno = $SEARCHID