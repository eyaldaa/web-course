# web-course

* make sure you have the following libraries/packages installed:
  - nodejs + npm
  - mocha
  - chai
  - chai-http
  - docker

Instructions: [type = in terminal]
1. To run unit tests: type in main folder "npm run-script unit"
2. To run web server: type in main folder "npm start"
3. To run integration tests: type in main folder "npm run-script int" (make sure the server is up with "npm start")
4. Docker:
  a. To build the docker file type in main folder: "docker build -t <your-username>/web-course-app ."
    for ex: "docker build -t eyal/web-course-app ."
  b. To run it type in main folder: "docker run -d -p 3000:3000 <your-username>/web-course-app:latest"
    for ex: "docker run -d -p 3000:3000 eyal/web-course-app:latest"
