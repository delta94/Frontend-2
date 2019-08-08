## prerequisite

1. Install Http Server (Ngnix, Apache ...)

2. Install Nodejs and NPM

## How to deploy

Before you can build this project, you must install and configure the following dependencies on your machine:
Enviroment require: nodejs + nginx

1. Pull source code from Giblab or bitbucket.

You will only need to run this command when dependencies change in [package.json](package.json).

    npm install

2. config url api file webpack.common.js
   set variable SERVER_API_URL = url api value
3. Build source
   npm run webpack:build

4. Copy source from target/classes/static/ vào thư mục của nginx
