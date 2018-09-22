## Demo App

This file describes how to build and execute the demo app.

If you want to build the demo against the local repo, create a symlink to the _/src/lib_ folder in the folder *node_modules/svogv*. For users on 
Windows I have added a batch file that creates this link. Linux users use the usual **ln** command.

If you want to build the demo against the official repo on npm, install SVOGV like this (in the demo folder!):

~~~
npm install svogv --save
~~~

You can also build against your local build:

~~~
npm install ../../dist/lib --save
~~~

This assumes that you already have made successful build of the lib alone -- see instructions there.

### About

The demo app shows the components in action. It's a simple http server that serves static files. The demo data is in the TypeScript sources.

### Build

> You need to have *gulp* in the path so you can execute the command line interfaces.

Use this command to install the demo:

~~~
npm install

npm run build

npm start
~~~

That's it. 

> The build script copies the data to _/../../dist/demo_ folder and executes the 'http-server' on port 3000, then. The default browser opens automatically. Enjoy! 

The demo ist part of the complete project as shown on Github. 

![](/docs/images/DemoInstruction.png)

> If an `ERRADRINUSE` message occurs you may have to change the port to something other than 3000.

#### Explanation

* **npm install**: Install all dependencies (but not SVOGV, see above)
* **npm run build**: Execute the *gulp* script to make the files available in the right folder
* **npm start**: Start the HTTP server and browser

## Objections

The project is also a good starter for learning about Angular compression and production optimization. The underlying builder is based on Gulp, Rollup, SystemJS-Builder and several common tools for minification and code reduction.

### WebPack

The final self executing (IIEF) file is 830 KB in size and when compressed with gzip we get 207 KB. That's quite good as it has almost everything we need. It's accompanied by:

* vendor.js (193 KB, 62 KB zipped)
* site.css (106 KB, 18 KB zipped) -> including all of Bootstrap 4

We now use WebPack (was Gulp & Rollup before) and it's plain the typical way WebPack works, nothing special.