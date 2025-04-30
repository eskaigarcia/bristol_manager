<!DOCTYPE html>
<html lang="es">
<head>
    <?php include './components/htmlHead.php'; ?>
    <style>
        /* Añadir estilo para desplazar el indicador de precio hacia la derecha */
        .range-container {
            display: flex;
            align-items: center;
        }

        #precioOutput {
            margin-left: 20px;
            font-size: 1.2em;
        }

        /* Alineación para "Activo" y "¿Es Intensivo?" */
        .checkbox-container {
            position: relative;
            margin-top: 20px;
            height: 40px;
        }

        .checkbox-container .activo {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .checkbox-container .intensivo {
            position: absolute;
            top: -10px;
            left: 200px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
    </style>
</head>
<body>
    <div id="app">
        <?php include './components/navView.php'; ?>
        <main>
            <header>
                <h1>Grupos</h1>
                <button onclick="window.location.href='añadir_grupos.php'" class="cta">Nuevo grupo</button>
            </header>

            <div class="card full">
                <h2>Buscar grupos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <label for="g_nombre">Nombre:</label>
                    <input type="text" id="g_nombre" name="g_nombre">

                    <label for="g_asignatura">Asignatura:</label>
                    <input type="text" id="g_asignatura" name="g_asignatura">

                    <label for="g_modalidad">Modalidad:</label>
                    <select id="g_modalidad" name="g_modalidad">
                        <option value="">-- Seleccionar --</option>
                        <option value="presencial">Presencial</option>
                        <option value="hibrido">Híbrido</option>
                        <option value="online">Online</option>
                    </select>

                    <label for="g_precio">Precio:</label>
                    <div class="range-container">
                        <input type="range" id="g_precio" name="g_precio" min="0" max="100" step="1" value="50">
                        <output for="g_precio" id="precioOutput">50</output>
                    </div>
                    <script>
                        document.getElementById("g_precio").addEventListener("input", function() {
                            document.getElementById("precioOutput").textContent = this.value;
                        });
                    </script>

                    <div class="full subGrid">
                        <label for="g_horasSemanales">Horas:</label>
                        <select id="g_horasSemanales" name="g_horasSemanales" required>
                            <option value="1">1 Hora</option>
                            <option value="1.5">1.5 Hora</option>
                            <option value="2">2 Horas</option>
                            <option value="3">3 Horas</option>
                            <option value="4">4 Horas</option>
                        </select>
                    </div>

                    <!-- Activo e Intensivo -->
                    <div class="checkbox-container">
                        <div class="activo">
                            <label for="g_esActivo">Activo:</label>
                            <input type="checkbox" id="g_esActivo" name="g_esActivo" value="1">
                        </div>
                        <div class="intensivo">
                            <label for="g_esIntensivo">¿Es Intensivo?</label>
                            <input type="checkbox" id="g_esIntensivo" name="g_esIntensivo" value="1">
                        </div>
                    </div>

                    <div class="full center">
                        <button type="submit" class="cta">
                            <?php include './img/search.svg' ?>
                            Buscar
                        </button>
                    </div>
                </form>
            </div>

            <div class="card full">
                <?php include './resources/groupSearch.php' ?>
            </div>

            <script src="./resources/groupDetailsBuild.js"></script>
            <script src="./resources/groupDetailsEdit.js"></script>
            <script src="./resources/scrollspy.js"></script>
        </main>
    </div>
</body>
</html>
