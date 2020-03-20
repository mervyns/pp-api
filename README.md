# PP API App
This is a basic transactions API app.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development purposes.

## Running locally
### Prerequisites
- NodeJS 10.x

### Installing
It is your choice on which package manager to run. I have chosen to use yarn in the examples, however NPM works perfectly fine and all you have to do is replace the yarn commands with npm commands.

To install backend
```
cd backend
npm i
```

To install frontend
```
cd frontend
npm i
```
### Running The Code
To run **backend**:
```
cd backend
npm run serve
```

To run **frontend**:
```
cd frontend
npm run start
```

## Running The App
Once done, navigate to http://localhost:8000 and you should be able to view the working React App in your window. Firefox is recommended for speed and ease of use. I have fixed most of the Cross-Origin Request (CORS) issues, but should you encounter a CORS issue whilst doing local development / testing, please enable the CORS plugin on your browser and report the issue to me.

## License
This project is licensed under the MIT License


## Questions and Answers
### Describe the structure of a serverless.yml file. How are AWS resources created using Serverless?
- A serverless.yml file is a file that describes all services and "infrastructure" required to run a project. It can be used to define all Functions, Events and Resources for a certain project.
- It is structured in the sense that it firstly declares the service/resource name, parameters which relate to the resource (i.e S3 Bucket Type, Lambda Execution Time), and also, event related parameters such as triggers or Event Mapping.
- It is a file that is automatically executed in a CI/CD framework and ensures that there is no drift in the Infrastruture and Resources provisioned for a certain project.
- In AWS, the resources are created with a CloudFormation template that runs during the CI/CD process. 

### How do you optimise a React SPA for production?
- Downside of React Framework is that it is Client Rendered, so we can take some of the rendering load off the Client, pre-render it in the server, and send it to the client to increase speed.
- We can implement common chunks from plugin, which creates a common.js for commonly used code. (Code Chunking)
- Write code to utilise lazy loading as much as possible.
- We can load larger libraries and resources which we require from a CDN in order to reduce the size of Webpack Outputs. (Asset Optimisation)

### Tell us a bit more about AWS CloudFormation and how you can securely reference vendor API keys in the configuration of stacks
- AWS CloudFormation is Infrastructure as Code, which provisions AWS Infrastructure in a serverless framework using a YML file. This method allows efficient scaling, as we do not need to manually provision resources as our project size increases.
- We can generate API Keys using API Gateway in AWS, exporting the key as a environment variable and referencing it in our code.
- Alternatively, we can utilise AWS Secrets Manager, storing the vendor API keys in the Secret Manager as a Secret, and then referencing it in our code.
