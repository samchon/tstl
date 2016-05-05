:: ---------------------------------------------------------------------------------
::	Git Commit
:: ---------------------------------------------------------------------------------
xcopy ts\std.js release\ /Y
xcopy ts\std.d.ts release\ /Y

git add .
git commit -m "v0.9 %date% %time%"
git push origin master