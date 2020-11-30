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
