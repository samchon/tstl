::PATH
SET RELEASE_DIR=D:\Homepage\samchon.github.io\stl\api\

::TRUNCATE DREGS
rd "%RELEASE_DIR%" /S /Q

:: ----------------------------------------------------------------
::    TYPE_SCRIPT
:: ----------------------------------------------------------------
SET TS_SRC_DIR=..\ts\src

::DOCUMENTATE
call typedoc --target ES5 --out %RELEASE_DIR% %TS_SRC_DIR% --mode file
xcopy "assets" "%RELEASE_DIR%assets\" /e /Y