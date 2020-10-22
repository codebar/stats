codebar Stats

This repository is the static Gatsby website for Codebar.

## What is Tailwind CSS?

> "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces."
> –[Tailwind CSS](https://tailwindcss.com)

## What is Gatsby?

> "Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps." -[Gatsby](https://www.gatsbyjs.org/)

## Development

```sh
yarn start
```

## Analysis

- `yarn analyze` - See what ESLint and Prettier can fix
- `yarn fix` - Run Prettier and ESLint with the `--fix` option
- `yarn type-check` - Run TypeScript type-check

## Build your site locally

Use `yarn build` to build your site for production - Gatsby has built in support for TypeScript, so no need to do anything special 👍.

## Continuous integration

Github Actions will run on each pull request checking if link, prettier, and TypeScript checks pass.

See the action [here](../.github/workflows/ci.yml).

## Continuous deployment

On each push to `master` Github Actions will run the checks and deploy the site to Github Pages.

See the action [here](../.github/workflows/cd.yml).
