# codebar stats

This repo contains a [script](./get-data/index.js) for running SQL queries against the codebar Postgres database.

The script writes the result of the queries to the [data](./www/src/data) directory within the front end.

The website then displays that data.

## Fetch the data

```sh
yarn data
```

See what queries are run [here](./get-data)

## Run the frontend

```sh
yarn start
```

See more [here](./www)

## TODO

- [ ] Setup Github Actions to run the data fetching script once a day
