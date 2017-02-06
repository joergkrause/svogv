## Demo App

This file describes how to build and execute the demo app.

If you want to build the demo against the local repo, create a symlink to the _/src/lib_ folder in the folder *node_modules/svogv*. For users on 
Windows I have added a batch file that creates this link. Linux users use the usual **ln** command.

If you want to build the demo against the official repo on npm, install SVOGV like this (in the demo folder!):

~~~
npm install svogv --save
~~~

### About

The demo app shows the components in action. It's a simple http server that serves static files. The demo data is in the TypeScript sources.

### Build

Use this command to install the demo:

~~~
npm install

bower install

npm run exec
~~~

That's it. 

> The build script copies the data to _/../../dist/demo_ folder and executes the 'http-server' on port 3000, then. The default browser opens automatically. Enjoy!  

The demo ist part of the complete project as shown on Github. 

![](/docs/images/DemoInstruction.png)

#### Explanation

* **npm install**: Install all dependencies (but not SVOGV, see above)
* **bower install**: Install Bootstrap 4 and FontAwesome
* **npm run exec**: Execute the gulp file to build and copy files and start the http server. The two sub tasks are: 
    * **npm run build**: Execute the *gulp* script to make the files available in the right folder
    * **npm run start**: Start the HTTP server and browser

