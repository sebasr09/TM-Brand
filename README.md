# FM-Dashboard

This project contains the dashboard for FM products management.

This project uses WebSockets for KYC requests. It manages the request and it state (Still working, ended). The WebSocket ID is persisted and used by the step functions to notify the end of the process. This was done because KYC request can take several minutes in complete.

## Prerequisites

To properly run the project you must have the following installed in you machine:

- Nodejs & npm
- <a href="https://docs.amplify.aws/start/getting-started/setup/q/integration/react#initialize-a-new-backend">AWS Amplify</a>

## Installation

Before running the project you must install the dependencies of the project using

```bash
npm i
```

## Run the project

To start the project you must be in the root folder of the project and execute

```bash
npm start
```

## Deploy

The dev and prod environments are auto deployed when a new commit is made to each branch. In the case you want to do the manaul deployment to _DEV_ environment you must use <a href="https://docs.amplify.aws/start/getting-started/setup/q/integration/react#initialize-a-new-backend">AWS Amplify</a> as follows. The config for this specific project must be like this:

![AmplifyInit](./screenshots/AmplifyInit.png 'AmplifyInit')

Then to deploy the project with its infrastructure run the following code:

```bash
amplify push
```

## References

[1] Amplify Tutorial (https://docs.amplify.aws/start/getting-started/setup/q/integration/react#initialize-a-new-backend)
