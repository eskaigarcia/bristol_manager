<?php
include __DIR__ . '/resources/dbConnect.php';

// Asegurar que la carpeta de backups existe
$backupDir = __DIR__ . '/backups';

if (!is_dir($backupDir)) {
    mkdir($backupDir, 0777, true);
}

$filename = 'backup_' . date('Y-m-d_H-i-s') . '.sql';
$filepath = $backupDir . '/' . $filename;

$mysqldumpPath = '"C:\\xamppp\\mysql\\bin\\mysqldump.exe"'; 

$dbUser = escapeshellarg($db_user);
$dbPass = escapeshellarg($db_pass);
$dbHost = escapeshellarg($db_host);
$dbName = escapeshellarg($db_name);

$command = "$mysqldumpPath --user=$dbUser --password=$dbPass --host=$dbHost $dbName";

exec($command, $output, $return_var);

if ($return_var === 0) {
    // Guarda la salida en el archivo
    file_put_contents($filepath, implode("\n", $output));
    header("Location: mantenimiento.php?status=success&file=" . urlencode($filename));
} else {
    echo "<h2>Error al crear el backup</h2>";
    echo "<pre>" . implode("\n", $output) . "</pre>";
    echo "<p>Ruta donde se intenta guardar: $filepath</p>";
    exit;
}
