## Demo App

This file describes how to build and execute the demo app.

### About

The demo app shows the components in action. It's a simple http server that serves static files. The demo data is in the TypeScript sources.

### Build

Use this command to install the demo:

~~~
npm install

bower install

npm run build

npm run start
~~~

That's it. The build script copies the data to /dist/demo folder and executes the 'http-server' on port 3000, then. The default browser opens automatically.  

#### Explanation

* npm install: Install all dependencies
* bower install: Install Bootstrap 4 and FontAwesome
* npm run build: Execute the *gulp* script to make the files available in the right folder
* npm run start: Start the HTTP server and browser


