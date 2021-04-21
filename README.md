
## Table of contents

* [Getting Started](#Getting-Started)
* [Prerequisites](#Prerequisites)
* [Installation](#installation)
    * [Environment Variables](#Environment-Variables)
    * [Starting the dev server](#Starting-the-dev-server)
    * [Running the tests locally](#Running-the-tests-locally)
    * [Starting the production server](#Starting-the-production-server)
* [usage](#usage)
    * [Generating short url](#Generating-short-url)
    * [Translating the short url](#Translating-the-short-url)
# blty-url-shortener


## Getting Started

To get a copy of this project up and running on your local machine for testing and development, you would need to have a minimum of the listed prerequisites installed on your local machine. To get a head start.

### Prerequisites

You must have

1. [Node.js](https://nodejs.org/) (_v8.12.0 or higher_) and npm (_6.4.1 or higher_) installed on your local machine. Run `node -v` and `npm -v` in your terminal to confirm that you have them installed

2. GIT bash

### installation

To get started, clone this repository on your local machine using the following steps:

Launch your terminal and navigate to the folder you want the project to be and enter the the following commands:

```
$ git clone -b develop https://github.com/
$ cd express-pharmacy-backend
$ npm install
```
### Environment Variables
Create a `.env` file and add the environment variables described in the .env.sample file. 


## Starting the dev server

```bash
npm run dev
```

## Running the tests locally

```bash
npm test
```
## Starting the production server

```bash
npm start
```

### usage
The bity-url-shortener a  Playgrounds interface at ```/graphiql```. The query accept one required argument and two optional parameter,

- ```url - required``` : The url to be converted to a short url

- ```customName - optional``` : a 6-character name provided to used to form a short url in place of a generated random string

- ```replace - optional``` : a boolean value which represent if a if existing long url should be replace with the new one

### Generating short url
## Only the required url parameter is supplied

```
query {
  urlShortener(url: "https://replit.com/@Aijeyomah/ZealousWetParameter#index.js") {
    status
    message
    shortUrl 
  }
}

```

## result
```json
{
  "data": {
    "urlShortener": {
      "status": 200,
      "message": "Successfully shortened url",
      "shortUrl": "http://localhost:4000/RwxoI5"
    }
  }
}
```
## The required url parameter and an optional custom name is provide is supplied

```
query {
  urlShortener(url: "https://replit.com/@Aijeyomah/ZealousWetParameter#index.js", customName: "enyata") {
    status
    message
    shortUrl 
  }
}

```

## result
```json
{
  "data": {
    "urlShortener": {
      "status": 200,
      "message": "Successfully shortened url",
      "shortUrl": "http://localhost:4000/enyata"
    }
  }
}
```

### Translating the short url

This redirects the short url to it's corresponding long url
