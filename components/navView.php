<div id="navView">
    <img class="align_left logo" src="img/logo.webp" alt="Logotipo">

    <button 
            class="align_left <?= basename(path: $_SERVER['PHP_SELF']) === 'dashboard.php' ? 'active' : '' ?>"
            onclick="window.location.href='dashboard.php'"
        >
        <img src="img/dashboard-ondark.png" alt="">
        Panel de control
    </button>

    <button 
            class="align_left <?= basename(path: $_SERVER['PHP_SELF']) === 'notificaciones.php' ? 'active' : '' ?>"
            onclick=""
        >
        <img src="img/notificacion-ondark.png" alt="">
        Notificaciones
    </button>

    <hr>

    <button 
            class="align_left <?= basename(path: $_SERVER['PHP_SELF']) === 'alumnos.php' ? 'active' : '' ?>"
            onclick="window.location.href='alumnos.php'"
        >
        <img src="img/persona-ondark.png" alt="">
        Alumnos
    </button>

    <button 
            class="align_left <?= basename(path: $_SERVER['PHP_SELF']) === 'grupos.php' ? 'active' : '' ?>"
            onclick="window.location.href='grupos.php'"
        >
        <img src="img/grupo-ondark.png" alt="">
        Grupos
    </button>

    <button 
            class="align_left <?= basename(path: $_SERVER['PHP_SELF']) === 'calendario.php' ? 'active' : '' ?>"
            onclick=""
        >
        <img src="img/calendario-ondark.png" alt="">
        Clases
    </button>

    <button 
            class="align_left <?= basename(path: $_SERVER['PHP_SELF']) === 'relaciones.php' ? 'active' : '' ?>"
            onclick=""
        >
        <img src="img/group-ondark.png" alt="">
        Amigos
    </button>

    <button 
            class="align_left <?= basename(path: $_SERVER['PHP_SELF']) === 'profesores.php' ? 'active' : '' ?>"
            onclick="window.location.href='profesores.php'"
        >
        <img src="img/teacher-ondark.png" alt="">
        Profesores
    </button>

    <hr>

    <button 
            class="align_left <?= basename(path: $_SERVER['PHP_SELF']) === 'pagos.php' ? 'active' : '' ?>"
            onclick=""
        >
        <img src="img/pagos-ondark.png" alt="">
        Pagos
    </button>
</div>