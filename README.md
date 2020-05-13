# codebar stats

This repo contains a [script](./get-data/index.js) for running SQL queries against the codebar Postgres database.

The script writes the result of the queries to the [data](./www/data) directory within the front end.

The website then displays that data.

## Fetch the data

```sh
yarn data
```

See what queries are run [here](./get-data).

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
