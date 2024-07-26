# lfca-open-knowledge-hub

## Running locally

1. Install dependencies:
   ```bash
   yarn
   ```
2. Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```
3. Update values in `.env.local` file

## Available scripts

- `dev`: Runs server in dev mode while watching for file changes
- `build`: Builds production build into `./next` folder
- `start`: Runs production server from `./next` folder
- `lint`: Runs linter
- `lint:fix`: Runs linter and tries to fix all errors
- `sync-less-vars`: Sync less variables with css

## Contributing

1. Create a new branch for your changes that includes a [scope](#scopes) (e.g. `feat/my_awesome_new_feature`)
2. If you make changes to the DB schema make sure to run `yarn migrate:dev` to generate the required migrations
3. Commit your changes including a [scope](#scopes) in the commit message (e.g. `feat: added my awesome new feature`)
4. Create a PR and give it a title that also includes a [scope](#scopes) (e.g. `feat: added my awesome new feature`)

### Scopes

For branch names, commit messages and PR titles we follow a simplified version of the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) specification by ensuring we always add a scope to our name/message/title

Use one of the following scopes:

- `feat`: new feature for the user
- `fix`: bug fix for the user
- `refactor`: refactoring code, eg. renaming a variable
- `test`: adding missing tests, refactoring tests; no production code change
- `style`: formatting, missing semi colons, etc; no production code change
- `ci`: changes to the CI configuration files and scripts
- `chore`: updating autamated scripts, project setup etc; no production code change
- `docs`: changes to the documentation

#### Usage with branch names

For branch names we use a `/` as delimiter:

```
feat/my_awesome_feature
```

#### Usage with commit messages

For commit messages we use a `:` as delimiter:

```
feat: added some new feature
```

#### Usage PR titles

For PR titles we use a `:` as delimiter:

```
feat: added some new feature
```
