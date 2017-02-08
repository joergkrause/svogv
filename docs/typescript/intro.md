# Introduction to TypeScript

TypeScript is JavaScript with a professional attitude. It's almost typesafe, supports modularity and scaleswell with your growing project.

## Setup 

TypeScript needs a transpiler (or compiler, transpiler is an artifical word for tools, that translate from one language into another) and a configuration.

The transpiler is a **npm**-package and the configuration is just _*.json_ file, called *tsconfig.json*.

> In former environments some typing information was handled separately. That's no longer the case. Typings are distributed as **npm**-packages.

## Configuration

Assuming no special editor or tool support such as Visual Studio is an advantage. Instead of following the rules of a tool you have the freedom to decide whatever 
version or build environments you want to use. If you see the speed of development, the progress of parts of the toolchain and the diversity of solutions this is
a great improvement for yoiur productivity. Nothing worse than sticking with an app and the world moves on.

> Hence, we go command line, and nothing else matters.

## Build Tool Chain

The tool chain starts with NodeJs and **npm**. Check your machine by opening a terminal (console / command line or PowerShell) and type:

~~~
npm -- version
~~~

Once you have node up and running you need the transpiler. Get it from **npm**. To start as easy as possible do these steps:

1. Create a new folder (use all lower case letters) and cd' in it
2. Type **npm init** and follow the instructions. Usually you answer all questions withjust ENTER.
3. Type **npm i typescript --save-dev -g**

The **npm** tool creates a file *package.json* that contains all references and settings for the TypeScript project. The `i` command (or `install`) installs the 
TypeScript transpiler package and all dependencies. The switch `--save-dev` saves the instruction to the package file. The switch `-g` installs TypeScript globally
so we need no further steps to use it elsewhere.

You can now check whether the transpiler is available:

~~~
tsc --version
~~~

When it's up and running, you can create the config file like this:

~~~
tsc --init
~~~

You get a file that looks like this:

~~~
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": false
    }
}
~~~

It's recommended to split source and target files from the very beginning. The configuration has a parameter to read the sources from a subfolder. To do so you need these steps:

1. Create a subfolder *src* for the sources
2. Create a subfolder *dist* where the files your want to distribute go  

Add two more options to the config file:

~~~
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": false,
        "outDir": "./dist",
        "rootDir": "./src"
    }
}
~~~

Whereas `outDir` controls where the compiled files go and `rootDir` is where the transpiler starts. 

Now add a file named *index.ts* with some basic TypeScript in it:

~~~
interface person {
    name: string;
    city: string;
}

class student implements person {

    constructor(public name: string, public city: string){
        
    }

}  
let student1 = new student("Steven", "London");
let student2 = new student("Katja", "Moscow");

console.log(`Student 1 is ${student1.name}`);
console.log(`Student 2 is ${student2.name}`);
~~~

On the console you type this to invoke the transpiler:

~~~
tsc
~~~

The default setting makes use of the *tsconfig.json* file. It takes the blink of an eye and you get the result in the *dist* folder:  

~~~
var student = (function () {
    function student(name, city) {
        this.name = name;
        this.city = city;
    }
    return student;
}());
var student1 = new student("Steven", "London");
var student2 = new student("Katja", "Moscow");
console.log("Student 1 is " + student1.name);
console.log("Student 2 is " + student2.name);
~~~

You can see two crucial things here. First, the interface is merely for type control and does not appear in JavaScript. The class is being transformed into 
the module pattern every JavaScript developer shall know about. Not that readible but very powerful. Now the transpiler is doing the hard work and we can enjoy
nice classes.

> Keep in mind that the result is still JavaScript with all the quicks and quirks. TypeScript doesn't make it better, just easier and more robust.

To get the output you need to execute the file. For the first steps we don't need a browser here. NodeJs will do it. You can use **npm** to invoke the right file. While it 
is obviously possible to do this with NodeJs alone it's recommend to use **npm** from the beginning to have a clear structure in the project for all the upcoming
automation tasks. Hence, we change the **package.json** to look like this:

~~~
{
  "name": "ts-demo",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "node ./dist/index.js"
  },
  "author": "Joerg <IsAGeek> (http://www.joergkrause.de)",
  "license": "ISC"
}
~~~

Once the file *index.js* exists in *dist* folder, the following executes the file:

~~~
npm run start
~~~

Here `run` is the command and *start* is a parameter that refers to the name in the *scripts* parameter. And this reads like that:

~~~
node ./dist/index.js
~~~

> The paths always begin with './'. That's because the default search path goes through *node_modules* first. Using the leading dot avoids this and starts right where we are.

A reminder for Windows users: You use the same forward slash for all paths. Nothing different here from Linux. You should never add Windows specific things such as
backward slashes. 