@echo off
chcp 65001 > nul

echo Iniciando servicios necesarios...
echo.
echo Esto puede llevar un momento, verá en su pantalla una ventana
echo emenergente blanca con un logo morado y una barra de carga azul.

echo.
echo Esperando a que todos los servicios estén en ejecución...

start /wait C:\wamp64\wampmanager.exe

echo.
echo Iniciando aplicación...

start http://localhost/bristolManager/