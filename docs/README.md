This documentation describes the background and internal functionality of the SVOGV project. It's primarily for learning purposes. 
It's not a replacement of the common documentation for developers using the library.

**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Making Of -- How I wrote a NPM package](#)
- [Angular 2 Components](#)
	- [What's this about](#)
	- [The foundation](#)
		- [1. Load an Editor](#)
		- [2. Setup your project](#)

# Making Of -- How I wrote a NPM package

> This is work in progress. Come back often to get recent updates. Currently it's version 0.0.25, published Jan 12, 2017.

The primary part is a almost complete introduction into the world of modern web frontend development. It encapsulates the 
tool chain, languages, repositories, cloud service and everything else you need to create awesome apps.

The second part is the actual delopment work -- the app's code and frameworks. I decided to use Angular 2 and Bootstrap 4 
as a foundation. Angular 2 introduced as familiar concept in a new way for the web: components. By building a component tree a web app gets
better maintainability and clear design, that's closer to the "treeish" nature of HTML. It fits better in the Browser's ecosystem
than the traditional MVC (model view controller) model.

A big step for web developers was the usage of TypeScript. While other pre-compilers or transpilers are around for years (CoffeeScript for instance),
TypeScript had the most mature and professional approach. It brings web developement to an entier new level. 

However, this comes with a penalty. The learning curve is steep. The setup is huge and confusing. And the effort to get a simple app running
is enourmous. If you create a huge app, however, it's a trade off. Your code becomes cleaner, easier to maintain, better to read. Your development
speed will grow and you can be fast, really fast creating stuff. The setup effort is a one time process and hence it's usually a no-brainer.

## What's this about

This document describes the following:

* The foundation of the TS/JS-ecosystem
* Using Gulp as a build tool
* Using Travis for CI (continues integration)
* Setup of a professional NPM package
* Rules to develop a concise library

## The foundation

First, you need to now how to create stuff and how to deploy stuff. You need these things first:

* An editor
* A command line and some tools to build and deplay your stuff
* A server to host your stuff
* A browser to view your stuff       

So, that's it. 

Missing the Operating System? No problem. Choose what you like. Everything shown here will run on Linux, Windows, and even a Mac.
Simply don't care. Welcome to the brave new world.

Need something to buy? No, not at all. Everything is open source and free. At least as long as you build OS stuff by yourself. For enterprises
are some more options, such as private repositories. That's the way some companies make some money. But even so, it's really cheap. So no 
worries again. 

Some of the tools run in the cloud. I strongly recommend considering to use these tools. It saves you tons of time and money. Unless you work
for a secret service you don't get any benefits from doing everything locally. The amount of data you need to transfer is small. Even a bad
connection is usually sufficient.

To setup a project like this you start right now that way:

### 1. Load an Editor 

I use [Visual Studio Code](https://code.visualstudio.com/), but you may try some others to achieve your code tasks. Some alternatives are:

* [Sublime Text](https://www.sublimetext.com/)
* [VIM](https://www.liveedu.tv/godlyperfection/)
* [Atom](https://atom.io/)

> A good description of all of these can be [found here](http://blog.liveedu.tv/10-best-text-editors-programming-2016/).

### 2. Setup your project

Modern web development is file based. No hidden stuff, no secret folders, nothing but plain text files. Any drawback? Yes, there are many
different files needed. A lot of them, really. While writing this I made a quick count of SVOGV project, locally:

46.822 files, 6.323 folders

You say: you're kidding, dude? I say: No, bro, that's the way it is. But I have good news to you. The majority is from references, dependencies 
I have to get my stuff running. Most of the libraries we use are from NPM (node package manager). That's the repository for node moduls. We take a look
into this shortly. The folder where all the stuff is has the name *node_modules*. What's in it:

30.107 files, 4.233 folders

So we're pretty much down by 60%, but it's still way to many. So let's exclude more:

* a folder */dist* where my project gets published to. That generated from a script and hence I don't care (1.987 files, 170 folders).
* again a folder named *node_modules* and another one called *bower_components* in the Demo app, counting for 13.596 files and 1.607 folders.

So what we get:

|Part       |Files  |Folder  |
|-----------|-------|--------|
|Node Rep   |30107  |4233|
|Dist       | 1987  | 170|
|Demo Reps. |13569  |1607|
|-----------|-------|--------|
|Total      |45690  |6010    |

So, finally, my own stuff is 1.132 files in 313 folders. That's still a lot, but not a much as I don't can't handle it.

So, start creating a folder where all the files go. Let's call it like the project: 'svogv' (you choose another name for your project, of course).

Somewhere on my disc I type:

~~~
$ mkdir svogv
~~~

> The prompt I use here is $ like most *nix systems have. I remove the concrete path and you can do same on Windows as well. I recommend to choose a short start point, such as C:\App>, too.

Then go into this:

~~~
$ cd svogv
~~~

Once you're here it's boring empty. So we need some tools to get stuff in here. The first set of tools is part of the JavaScript ecosystem:

* Git - host your repository and manage versions
* Node - The engine that does the hard work

And [here is how to setup node](./setup/setup-node).

Next, Git is required. Check first if it is already present on your system:

~~~
$ git --version
~~~

If not, install according your operating system. And [here is how to setup Git](./setup/setup-git).

Then, an account on Github is required. Finally, the package will be hostet on Github and partially distributed to NPM. While there are alternative ways,
such as Bitbucket, I recommend Github for beginners because the sheer amount of literature, support, websites, and answers on [Stack Overflow](https://stackoverflow.com/)
is overwhelming. And it is, last but not least, easy enough to get the point in short time.

So, go to [GitHub](https://github.com/), and set up an account. 

Now, we're set and the journey into the package creation can begin. The package is about Angular 2 components and I assume that you have at least a basic
interest in Angular 2 stuff. So apart from talking about the package structure  I'm going to explain all the component stuff as well.

You can continue reading here:

* [Create an NPM package](./create-npm) 
* [Develop Advanced Angular Components](./angular-intro) 
