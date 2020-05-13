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

## Run the frontend

```sh
yarn start
```

See more [here](./www)

## TODO

- [ ] Setup Github Actions to run the data fetching script once a day
