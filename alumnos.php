<!DOCTYPE html>
<html lang="en">
<head>
    <?php include './components/htmlHead.php'; ?>
</head>
<body>
    <div id="app">
        <?php include './components/navView.php'; ?>
        <main>
            <!-- Barra de búsqueda -->
            <form action="" id="searchBar">
                <p>Buscar:</p>
                <input type="text" placeholder="Nombre">
                <p>en:</p>
                <select>
                    <option value="alumnos">Alumnos</option>
                    <option value="grupos">Grupos</option>
                    <option value="clases">Clases</option>
                </select>
                <button type="submit"><img src="img/search.png" alt=""></button>
            </form>
        </main>
    </div>
</body>
</html>