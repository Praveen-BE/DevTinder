

<style>
  h1, h2, h3, h4, h5, h6 {
    background-color: #000;
    border-bottom: none;
    color: #A9A9A9;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    border-radius: 10px; 
  }
</style>

# NAMASTE NODE JS 
### Season - 2

## EP-3 - Creating Our Express Server 🚀 

<details>
<summary>
Read 
</summary>

Link For Commit [Creating Our Express Server - Link🔗](https://github.com/Praveen-BE/DevTinder/commit/7c50b9c) if you want Checkout😊

> - create a repository
> - initialize the repository
> - node_modules, package.json, package-lock.json
<br> &nbsp;&nbsp;&nbsp; **node_modules** - stores extenal dependencies of the project
<br> &nbsp;&nbsp;&nbsp; **package.json** - contains metadata about node.js project, including its dependencies, scripts, configuration, and other details
<br> &nbsp;&nbsp;&nbsp; **package-lock.json** - contains information about the dependencies and their exact versions for a node.js project 
> - install express
> - create a server
> - Listen port 7777
> - Write request handlers for /test, /hello
> - Install nodemon and Update Scripts inside package.json
> - Differnce Between Carrat and Tilde (^ vs ~)
<br> &nbsp;&nbsp;&nbsp; 
> expample - "express" : "^4.21.5" 
<br> &nbsp;&nbsp;&nbsp; 
> 5 mention **patch** (tiny bug fix) version
<br> &nbsp;&nbsp;&nbsp; 
> 21 mention **Minor** (Minor Upgrade has Backward compatibilty) version
<br> &nbsp;&nbsp;&nbsp; 
> 4 mention **Major** (Major Upgrade don't has Backward compatibilty)  version
>>  | Caret(^) | Tilde(~) |
>> |:---------:| :---------: |
>> | Update minor Versions | Upadate Major Versions |
> - Whate is the use of "-g" while npm install
> <br> &nbsp;&nbsp;&nbsp; "-g" It installed Globally
</details>

<hr>

## EP-4 - Routing and Request Handlers

<details>
<summary>
Read
</summary>


> - initialize git
> - .gitignore
> - why Package-lock.json need in git repository ?
<br> &nbsp;&nbsp;&nbsp; it Maintaines exact version of the dependencies, <br> it helps to reproducibility, collaboration consistency, security and stability tracking, reproducible builds
> - create a remote repo on github.
> - push code to remote origin
> - Play with routes and route exptensions ex "/hello", "/", "hello/2", "xyz"
> - Order of the Routes Matter a Lot
> - Install Postman app and Make a Workspace/Collection > Test API Call
> - Write Logic to handle GET, POST, PATCH, DELETE http methods API calls and test them on postman

Link For Commit [Explore the HTTP Methods - Link🔗](https://github.com/Praveen-BE/DevTinder/commit/90380f8
) if you want Checkout😊

> - Explore routing and use of ?, + , (), * in the routes
> - Use Regex in routes /a/, /.*fly$/
> - Reading the Query Params in the routes
> - Reading the Dynamic Routes :-
<br> &nbsp;&nbsp;&nbsp; Different end point by api header, Query parameters, Request Body

Link For Commit [Playing With Routes - Link🔗](https://github.com/Praveen-BE/DevTinder/commit/66797d4
) if you want Checkout😊
</details>

## EP-5 - Middlewares & Error Handlers

<details>
<summary>
Read
</summary>

> - Multiple Route Handlers - play with the code
> - next ()
> - next function and error along with res.send()
> - app.use("/route", rH, [rH2, rH3], rH4, rH5);

Link For Commit [Multiple Route Handler - Link🔗](https://github.com/Praveen-BE/DevTinder/commit/7e5f332
) if you want Checkout😊
> - Why i need multiple route handler ? Answer :- Middleware
<br> // GET /user => Middleware Chain => Request Handler
> - **What is Middleware?**
<br> At its core, middleware in Express.js refers to functions that execute during the lifecycle of a request to a web server. These functions can modify the request and response objects (req, res), and either terminate the request-response cycle or pass control to the next middleware function. <br> 
 **Why Do We Need it?** <br>
Middleware functions can be used for various tasks like logging, authentication, error handling, and more.<br>
In simpler terms, middleware acts as a bridge between the incoming request from the client and the final response from the server.

I read some explainatin, This is One of the Amazing Explanation about Middleware
[Source From Medium By Aryan Kumar](https://medium.com/@finnkumar6/understanding-middleware-in-express-js-a-comprehensive-guide-5b13d72427fa)
> - How Express JS Basically handles request behind the scenes
> - Write a dummy auth middlewares for Admin
> - Write a dummy auth middlewares for all user routes, except /user/login


</details>