@echo off
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js nao foi encontrado. Instale a versao LTS pelo site oficial nodejs.org.
  pause
  exit /b 1
)
echo Abra http://127.0.0.1:4173 no navegador quando aparecer Local abaixo.
echo Mantenha esta janela aberta durante o uso. Ctrl+C encerra o piloto.
node server.mjs
pause
