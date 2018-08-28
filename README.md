# web-course

* Clone the git repository and make sure you have the following libraries/packages installed with "npm install":
  - nodejs + npm
  - mocha
  - chai
  - chai-http
  - docker
  - docker-compose

# Instructions: 

1. To run unit tests: "npm run-script unit"
2. To run web server: "npm start"
3. To run integration tests: "npm run-script int" (make sure the server is up with "npm start")
4. Docker:
      * To build the docker file: "docker build -t <your-username>/web-course-app ."
        - for ex: "docker build -t eyal/web-course-app ."
      * To run it: "docker run -d -p 3000:3000 <your-username>/web-course-app:latest"
        - for ex: "docker run -d -p 3000:3000 eyal/web-course-app:latest"
5. Docker-compose:
      * To run the docker-compose: "docker-compose up -d"
