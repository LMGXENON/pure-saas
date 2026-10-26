@echo off
REM Pure SaaS Windows batch launcher

set "BASE_DIR=%~dp0..\.."

if exist "%BASE_DIR%\scripts\pure-saas.mjs" (
  node "%BASE_DIR%\scripts\pure-saas.mjs" %*
) else if exist "%BASE_DIR%\cli\bin\pure-saas.js" (
  node "%BASE_DIR%\cli\bin\pure-saas.js" %*
) else (
  npx pure-saas %*
)

