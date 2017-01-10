# Setup Node

Node is JavaScript on the server or dev machine. Get [Node](https://nodejs.org/en/) first. For Windows and MacOS download and run the installer. 
For Linux use the usual `apt-get` command or a [package manager](https://nodejs.org/en/download/package-manager/). This would look like this:

~~~
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
~~~

> A word about versions. I go with Node 6 here. Node 7 is not completely supported and hence we don't create a node application but just using it as part of a tool chain, a newer version doesn't help.  

