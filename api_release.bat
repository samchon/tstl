::PATH
SET RELEASE_DIR=D:\Homepage\samchon.github.io\stl\api\

::TRUNCATE DREGS
rd "%RELEASE_DIR%" /S /Q

:: ----------------------------------------------------------------
::    TYPE_SCRIPT
:: ----------------------------------------------------------------
SET TS_SRC_DIR=.\

::DOCUMENTATE
typedoc --target ES5 --out %RELEASE_DIR% %TS_SRC_DIR% --mode file