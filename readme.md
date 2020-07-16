# NuxtForce
NuxtForce is a demo of Nuxt and Salesforce integration.
[Demo]

## References

### Connected App and Auth-Flows
  - [Create Your Connected App Trailhead]
  - [JSON Web Token Server-to-Server Flow]
  - [Web Server Flow for Web App Integration]

### Libraries and Frameworks
  - [JSforce]
  - [salesforce-jwt-promise]
  - [Nuxt]
  - [Vue]
  - [Vuetify]

## Instructions

### Pre-requisites
  - [Docker]
  - [Docker Compose]
  - [Nodejs]
  - [NPM]

### ./site/app/.env
Create a file "./site/app/.env" for the environment variables with the following variables
```
ENVIRONMENT={development / production}
HOST_NAME={your-host-name}
DB_CONNECT={your-mongoDB-connection-strong} # https://cloud.mongodb.com/
TOKEN_SECRET={your-jwt-secret} # For local authentication; can be any string
SF_CLIENT_ID={your-salesforce-connected-app-Id}
SF_INSTANCE_URL={your-salesforce-instance-url} #ex: https://bd1887-dev-ed.my.salesforce.com
SF_USER={sf-connected-app-user}
```

### Dev
```
cd site/app
npm install
npm run dev
```

#### Build
```
cd site
docker-compose up -d --build
```
[Demo]: <http://www.imugi.io>
[Docker]: <https://docs.docker.com/get-docker/>
[Docker Compose]: <https://docs.docker.com/compose/install/>
[Nodejs]: <https://nodejs.org/en/download/>
[NPM]: <https://www.npmjs.com/get-npm>
[Create Your Connected App Trailhead]: <https://trailhead.salesforce.com/en/content/learn/modules/sfdx_travis_ci/sfdx_travis_ci_connected_app>
[JSON Web Token Server-to-Server Flow]: <https://help.salesforce.com/articleView?id=remoteaccess_oauth_jwt_flow.htm&type=5>
[Web Server Flow for Web App Integration]: <https://help.salesforce.com/articleView?id=remoteaccess_oauth_web_server_flow.htm&type=5>
[JSforce]: <https://jsforce.github.io/>
[salesforce-jwt-promise]: <https://github.com/ChuckJonas/salesforce-jwt-promise>
[Nuxt]: <https://nuxtjs.org/>
[Vue]: <https://vuejs.org/>
[Vuetify]: <https://vuetifyjs.com/en/>