## Table of contents

* [Getting Started](#Getting-Started)
* [Prerequisites](#Prerequisites)
* [Installation](#installation)
* [Environment Variables](#Environment-Variables)

# express-pharmacy-backend
A backend application that facilitates the POS and Web integrations of Express Pharmacy.

## Getting Started

To get a copy of this project up and running on your local machine for testing and development, you would need to have a minimum of the underlisted prerequisities installed on your local machine. To get a head start.

### Prerequisites

You must have

1. [Node.js](https://nodejs.org/) (_v8.12.0 or higher_) and npm (_6.4.1 or higher_) installed on your local machine. Run `node -v` and `npm -v` in your terminal to confirm that you have them installed

2. GIT bash

### installation

To get started, clone this repository on your local machine using the following steps:

Launch your terminal and navigate to the folder you want the project to be and enter the the following commands:

```
$ git clone -b develop https://github.com/enyata/express-pharmacy-backend.git
$ cd express-pharmacy-backend
$ npm install
```
### Environment Variables
Create a `.env` file and add the environment variables described in the .env.sample file. 
Note that some of the variables are only neccessary if you are using docker. Refer to the `.env.sample` file for details.

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