# codebar stats

Website for viewing up-to-date statistics for codebar.

## Setup up

Make sure node is installed - I recommend using [nvm](https://github.com/nvm-sh/nvm).

This project uses [yarn workspaces](https://classic.yarnpkg.com/en/docs/cli/workspace#search), so you'll need to install the dependency manager [yarn](https://classic.yarnpkg.com).

Install packages needed for this project:

```sh
yarn
```

## Fetching the data

This repo contains a [script](./get-data/index.js) for running SQL queries against the codebar Postgres database.

The script writes the result of the queries to the [data](./www/data) directory within the front end.

To fetch the data, run

```sh
yarn data
```

**Note** that to run this script locally you'll need a `.env` file in the root of the repo, which needs to looks like this:

```sh
DB_URL=<databse-url>
```

The databse url can be found in Heroku.

## Start the frontend

```sh
yarn start
```

See more [here](./www)

## How to deploy?

Simply pushing to `master` will trigger Github Actions to run checks and then deploy to Github Pages.

Read more [here](./www/README.md).
