call build.bat

SET VERSION = v0.9.7

:: ---------------------------------------------------------------------------------
::	Git Commit
:: ---------------------------------------------------------------------------------
git add .
git commit -m %VERSION%
git push origin master

cd E:\Open_Source\DefinitelyTyped
git add.
git commit -m "TypeScript-STL %VERSION%"