echo Create a symlink on Windows to let demo compile without accessing the SVOGV without pulling from npm and using the local sources
cd node_modules 
rd svogv /S /Q
mklink /H /J svogv ..\..\lib
cd ..