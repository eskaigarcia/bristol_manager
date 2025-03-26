-- ALUMNOS

    -- Visualización de tabla
        SELECT 
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