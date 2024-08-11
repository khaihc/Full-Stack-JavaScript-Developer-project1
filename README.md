//////////////////////Getting Started//////////////////////
project-root/
|
├── build/
│   ├── controllers/
│   ├── images/  // This directory will be created after copying
│   ├── middleware/
│   ├── routes/
│   ├── services/
|   └── index.js
|
├── spec/
|   └── support/
|       └── jasmine.json
|
├── src/
│   ├── controllers/
│   ├── images/
│       ├── fullstack.png
│       ├── udacity.png
│       └── ...
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── index.ts
│
├── test/
│   └── index.spec.ts
|
├── package.json
├── README.md
└── tsconfig.json

Prerequisites
    1. Install Node.js and npm: https://nodejs.org/en

Installation
    1. Clone the repo
        git clone https://.....

    2. Install NPM packages
        npm install

    3. Start
        npm run build // Compile the TypeScript source code and copy the image files to the build directory.
        npm run test // Run unit tests.
        npm start // Run the compiled Node.js application.

Result of 1 endpoint and return status 200
full-stack.png
    http://localhost:5000/api/images?filename=full-stack&width=1000&height=500
fullstack.png
    http://localhost:5000/api/images?filename=fullstack&width=1000&height=500
udacity.png
    http://localhost:5000/api/images?filename=udacity&width=1000&height=500
uda&city.png
    http://localhost:5000/api/images?filename=uda%26city&width=1000&height=500
udacityjpg.jpg
    http://localhost:5000/api/images?filename=udacityjpg&width=1000&height=500

http://localhost:5000/api/images/?url=https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Sebastian_Thrun%2C_Stanford_2006_%28square_crop%29.jpg/1024px-Sebastian_Thrun%2C_Stanford_2006_%28square_crop%29.jpg&width=5000&height=5000



