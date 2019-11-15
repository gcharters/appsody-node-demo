# appsody-node-demo

This demo is a simple node app (based on the aws dynamoddb [example]( https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-dynamodb-tutorial.html) modifed to use an in-memory data structure instead.

## Instructions

Check out this repo

`cd appsody-node-demo`

run `npm install` to install the node dependencies

run `npm audit fix`  to fix any audit issues

## Run demo locally

`npm start`

goto [http://localhost:3000]()

Try to register a new user.
Registering with the same email twice should cause a message

Kill the server with `^C`

## Now appsify the code

In the root of the application run

`appsody init appsodyhub/nodejs-express none`

And then lauch the server again but this time through appsody.  The code will use the running mongodb docker instance started before.

run `appsody run `

Go back to  [http://localhost:3000]() Try to register a new user. Registering with the same email used in the original mode above should cause a message

In `index.js`

Add

```
      <div id="signupDuplicate" class="alert alert-success" style="display:none">
        <p id="signupDuplicateText">Fear not, you're already on the list! You'll be among the first to know when we launch.</p>
      </div>
```

and

```
                  case 409:
                    $("#signupDuplicate").show();
                    break;
```

stop the server with `^C`

## Run the Demo on OpenShift

Create a docker image of the application by running

`appsody build`

Now we need to create a descriptor for the application to run on OpenShift.  

`appsody deploy --generate-only`

This creates a kubernetes deployment descriptor - `appsody-deploy.yaml`

When complete we can push the image to docker hub and simultaneously start the deployment to OpenShift
Replace <account> with your github details.

To do this you will need to set your context to be that of your OpenShift deployment.

`appsody deploy -t <account>/appsody-node-demo --push  -n kabanero`

Visit your OpenShift server to see the demo deployed.  Find the related 'routes' and use the demo as before. 
