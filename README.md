# appsody-node-demo
This demo is a simple node app (based on the aws dynamoddb [example]( https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-dynamodb-tutorial.html) )
but modifed to use mongodb instead.

Instructions

Check out the repo.

create an .env file in the root directory -( you can copy or rename env_local to .env ) that has a PORT and an MDB entry 

run local_setup.sh in get mongodb running in docker as a daemon container 

start server locally 

npm start 

goto [http://localhost:3000]()

Try to register.
Registering with the same email twice should cause an error

Kill the server 

Now appsify the code.. 



