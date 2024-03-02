@ECHO OFF

SETLOCAL

WHERE /Q docker
IF %ERRORLEVEL% NEQ 0 GOTO :instalardocker

docker-compose down -v
docker-compose down
docker-compose up --build
pause
GOTO :done

:instalardocker
ECHO Instalar docker: "https://docs.docker.com/desktop/install/windows-install/"
pause
GOTO :done

:done

