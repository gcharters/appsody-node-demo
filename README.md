# appsody-node-demo
This demo is a simple node app (based on the aws dynamoddb [example]( https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-dynamodb-tutorial.html) )
but modifed to use mongodb instead.

Instructions

Check out the repo.

run npm install to pull in the node modules
run npm audit fix  to fix any audit issues

create an .env file in the root directory -( you can copy or rename env_local to .env ) that has a PORT and an MDB entry

run local_setup.sh to get mongodb running in docker as a daemon container

start server locally

npm start

goto [http://localhost:3000]()

Try to register.
Registering with the same email twice should cause an message

Kill the server

Now appsify the code..

appsody init appsodyhub/nodejs-express none

run with appsody run --docker-options "--env-file .env"

stop the server 

build a docker image 

appsody build 

tag the image and push to registry 


docker tag appsody-node-demo  <account>/appsody-node-demo:latest
docker push <account>/appsody-node-demo:latest

generate a deployment descriptor 

appsody deploy --generate-only 

In app-deploy.yaml 

replace the applicationImage value "appsody-node-demo"  with the one above  "<account>/appsody-node-demo"
add an env var section 
  env:
   - name: PORT
     value: 3000
   - name: MDB
     value: "mongodb://<userid>:<password>@<ip>:27017"

deploy 

appsody deploy 

stop the local stuff..


docker container stop mongo
docker container rm mongo to remove the docker
