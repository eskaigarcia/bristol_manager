@echo off
chcp 65001 > nul

rem Bristol Manager installer by Eskai García (C) 2025

echo ========================================
echo ^|   BRISTOL MANAGER - INSTALLER v1.0   ^|
echo ^|   Preparando instalación...          ^|
echo ========================================

timeout 3 > nul

echo.
echo Step 1 of 4 ==== Installing dependencies
if not exist VisualCppRedist_AIO_x86_x64.exe (
    echo ERROR: No se econtró VisualCppRedist_AIO_x86_x64.exe!
    echo Error fatal. La instalación no puede continuar.
    echo Pulsa cualquier tecla para salir.
    pause > nul
    exit 1
)
echo Sigue las instrucciones de la ventana emergente.
echo Deberás iniciar la instalación y aceptarla una vez termine.
echo.
echo Este paso puede llevar unos minutos.
start /wait VisualCppRedist_AIO_x86_x64.exe

echo.
echo Step 2 of 4 ==== Installing WAMP Server 64...
if not exist wampserver3.3.7_x64.exe (
    echo ERROR: No se econtró wampserver3.3.7_x64.exe!
    echo Error fatal. La instalación no puede continuar.
    echo Pulsa cualquier tecla para salir.
    pause > nul
    exit 1
)
echo Sigue las instrucciones en la ventana emergente.
echo Selecciona el idioma de la instalación y acepta
echo el acuerdo de usuario. 
echo.
echo ATENCIÓN: No cambies la ubicación de la instalación.
echo Acepta la instalación con sus valores predeterminados.
echo.
echo Este paso puede llevar unos minutos.
start /wait wampserver3.3.7_x64.exe

echo.
echo Step 3 of 4 ==== Installing Bristol Manager
echo Preparando para instalar archivos necesarios...
timeout 10 > nul
cd ..
cd ..
xcopy "bristolManager" "%SystemDrive%\wamp64\www\bristolManager" /E /I /Y

echo.
echo Step 4 of 4 ==== Install databases
echo Ejecutando los servicios necesarios...
start C:\wamp64\wampmanager.exe
echo.
echo Pulsa cualquier tecla para continuar cuando WAMP esté listo...
timeout 90 > nul

echo.
echo Instalando bases de datos...
start http://localhost/bristolManager/deploy/install.php

timeout 5 > nul

echo.
echo Copiando acceso directo al escritorio...
cd bristolManager
cd deploy
copy "Ejecutar Bristol Manager.lnk" "%USERPROFILE%\Desktop\" /Y
del "%USERPROFILE%\Desktop\Wampserver64.lnk" > nul

echo.
echo La instalación ha terminado correctamente
echo Puedes ejecutar Bristol Manager desde el acceso directo del escritorio.
echo Pulse cualquier botón para salir.

pause > nul