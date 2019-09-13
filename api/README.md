# PUBG Quickstats Backend

## Setting up for development

  1. Clone the repo.
  2. Copy `template.env` file to `.env` and setup all the variables (some of the
  variables only needed in production).
  3. Run the container:
  ```bash
  $ docker-compose -f docker-compose.dev.yml up --build -V app
  ```
## Deploying to production

  * Login into docker hub:
  ```bash
  $ docker login
  ```
  
  * Build the app image and push to repo:
  ```bash
  $  docker build --build-arg NODE_ENV=production -t jetpackpony/pubg-quickstats-api . \
        && docker push jetpackpony/pubg-quickstats-api
  ```
  * Copy `template.env` file to `.env.prod` and setup all the variables
  * Move `.env.prod`, `docker-compose.prod.yml` to your production machine. For gcloud VM:
  ```bash
  $ gcloud.cmd compute scp ./.env.prod ./docker-compose.prod.yml \
                           jetpackpony@vpc:/home/jetpackpony/pubg-quickstats-api \
                           --recurse
  ```
  * To ssh into the instance use:
  ```
  $ gcloud.cmd compute ssh jetpackpony@vpc
  ```
  * Rename `.evn.prod` to `.env` on the remote server. This needs to be done
  so that docker-compose picks it up.
  ```bash
  $ mv .env.prod .env
  ```
  * On production machine, to start the container with the app, run:
  ```bash
  $ docker-compose -f docker-compose.prod.yml pull
  $ docker-compose -f docker-compose.prod.yml up -d
  ```
  This setup works with [traefik](https://docs.traefik.io/user-guide/docker-and-lets-encrypt/)
which is setup in [jetpackpony/vm-setup](https://github.com/jetpackpony/vm-setup) repo.
  
  To make it run on it's own, you need to expose a port from the service and skip
  definig labels. Update `docker-compose.prod.yml` with ports variable:
  ```yml
version: '3'
services:
  app:
    ...
    expose:
      - 4000
    ports:
      - 4000:4000
  ```