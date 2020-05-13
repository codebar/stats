# codebar stats

Website for viewing up-to-date statistics for codebar.

## Fetching the data

This repo contains a [script](./get-data/index.js) for running SQL queries against the codebar Postgres database.

The script writes the result of the queries to the [data](./www/data) directory within the front end.

```sh
yarn data
```

**Note** that to run this script locally you'll need a `.env` file in the root of the repo, which needs to looks like this:

```sh
DB_URL=<databse-url>
```

## Start the frontend

```sh
yarn start
```

See more [here](./www)

## How to deploy?

Simply pushing to `master` will trigger Github Actions to run checks and then deploy to Github Pages.

Read more [here](./www/README.md).

## TODO

- [ ] Setup Github Actions to run the data fetching script once a day
