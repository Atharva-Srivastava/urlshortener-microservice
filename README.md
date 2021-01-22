# API Project: URL Shortener Microservice for freeCodeCamp


### User Stories

1. User/You can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`

2. If you pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`.

3. When you visit the shortened URL, it will redirect to the original link.


#### Creation Example:

POST [project_url]/api/shorturl/new - body (urlencoded) :  url=https://www.google.com

#### Usage:

[this_project_url]/api/shorturl/1

#### Will redirect to:

https://facebook.com

#### Steps to run this repo:-

1. Clone this repository from GitHub.

2. Upon heading to your favourite Code Editor run this command into the terminal "npm install" to install all the required dependencies.

3. When all the required dependencies are installed, run "node server.js" in the terminal to start the development server, the API will start running in the port 3000, to view it go to the following URL "http://localhost:3000".

4. On the line no. 42 uncomment the above statement and add your Mongodb connection url, as by doing this the short URLs will be directly saved into your database.
   Now you can start making requests to the API endpoints.
