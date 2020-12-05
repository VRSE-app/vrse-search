# VRSE (Visual Research Search Engine)

VRSE (Visual Research Search Engine) is a Visual Search Engine Application run through a docker container on your local machine. Depending on time and financial constraints the application will be deployed on a server and available at [vrse.app](https://vrse.app).

## Setup Documentation

This project uses a large amount of data obtained from the Semantic Scholar Open Research Corpus. To run this project locally requires the installation of 170 GB of zip files, which are then programmatically unzipped and written to the elasticsearch database and deleted one by one.

WARNING: running this code is not recommended unless you are sure you want to use a large amount of space.

### Steps

#### Download the data set

Download the full research corpus from semantic scholar. This requires the [Amazon AWS CLI](https://aws.amazon.com/cli/)

```sh
aws s3 cp --no-sign-request --recursive s3://ai2-s2-research-public/open-corpus/2020-11-06/ destinationPath
```

You can alternatively download the manifest via http and use it to download all the archive files via http as well. Note that this is noticeably slower and requires `wget`:

```sh
wget https://s3-us-west-2.amazonaws.com/ai2-s2-research-public/open-corpus/2020-11-06/manifest.txt
wget -B https://s3-us-west-2.amazonaws.com/ai2-s2-research-public/open-corpus/2020-11-06/ -i manifest.txt
```

#### Configure Server, Client, and ES (elasticsearch)

Configure the server and client to ensure ES (elasticsearch) and all related dependencies function in Docker container.

For set up of other dependencies and project set up see relevenat README documentation in each folder. (these will be unified at one point into one comprehensive installation README.md)

## Useful Sources

- https://blog.logrocket.com/full-text-search-with-node-js-and-elasticsearch-on-docker/

Next to try:
- KEY ARTICLE: https://blog.patricktriest.com/text-search-docker-elasticsearch/
- https://dev.to/numtostr/running-react-and-node-js-in-one-shot-with-docker-3o09
- https://dockertraining.readthedocs.io/en/latest/nodejs/angularjs-mongodb.html
- https://medium.com/bb-tutorials-and-thoughts/dockerizing-angular-app-with-nodejs-backend-typescript-version-4136a3ce019e
- https://www.freecodecamp.org/news/create-a-fullstack-react-express-mongodb-app-using-docker-c3e3e21c4074/
- https://www.bogotobogo.com/DevOps/Docker/Docker-React-App.php
- https://dockertraining.readthedocs.io/en/latest/nodejs/angularjs-mongodb.html
- https://blog.logrocket.com/full-text-search-with-node-js-and-elasticsearch-on-docker/
- https://medium.com/@xiaolishen/develop-in-docker-a-node-backend-and-a-react-front-end-talking-to-each-other-5c522156f634
- https://medium.com/ultralight-io/getting-gatsby-to-run-on-docker-compose-6bf3b0d97efb
- https://petemill.com/
- https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
- https://medium.com/valencian-digital/containerizing-a-gatsbyjs-site-with-docker-compose-eccaa9829e0c

## Meeting w/ Bob 1st December

- Sketches update
- Update on data access: 175 million papers with links - downloaded 175 GB of zip files
- Visualised a sampled subset of the dataset but there were no connections because the 100 papers had no citations in common
- Meeting with Bibliometric Mapping specialist: discussed Scopus and Web of Science - APIs where we can query data on papers
- Set up project dependencies with Docker for elasticsearch (database), GatsbyJS (frontend), and ExpressJS/NodeJS (api/server)
- Started bibliograpy/references index and set up document for interim report and final report
- Early collection of thoughts for the background section
- Research into deployment: deploying the tool will require hosting the dB and server on a virtual machine
-> there are college resources that do this and after speaking to ICT they said it is a typical use case to rent server space from the college so I should speak with my supervisor about it (virtual machines are not free)
-> there are external services that could also be effective (some cheaper/others not) but I am not sure whether it would be easier/harder to get funding approved
-> deploying the tool would make testing with users and evaluating its utility much more feasible because it would actually be possible to run user tests with both known and unknown users to collect and analyse data on user flows and experiences
-> I will likely take at least until February/early March until all the code is structured and secure enough to deploy

### Plan for next week

- Create database design for how the data will be stored (this could take some time because there is a lot of data and it would be very wasteful to make a mistake)
- Load static data (downloaded data) into elasticsearch database
- Set up endpoints on API to return nodes and links to the front end
- Return results based on search input from the front-end as a list
-> the visual layer will be the next layer of complexity to set up and then the plan is to iterate on each aspect of the system
-> More complete wireframes/mockups of the system
-> Color palette + design layout system to create both a product and a tool (branding and the look and feel of the interface could significantly affect user experience and conversion)

## Core links for the next phase of the project

- [Digital Ocean](https://www.digitalocean.com/community/tutorials/)(how-to-build-a-real-time-search-engine-with-node-vue-and-elasticsearch)
- [medium](https://medium.com/yom-ai/rest-api-with-node-js-and-elasticsearch-1368cf9df02a)
- [search engine node elasticsearch](https://www.sitepoint.com/search-engine-node-elasticsearch/)
- [github repo](https://github.com/sitepoint-editors/node-elasticsearch-tutorial)

### This Weekend

- Migrate Koa app to express and get it to work exactly the same way
- Set up elasticsearch database
- figure out how to
