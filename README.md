# Atomic components

This repo contains sharable Adatree react component based on [atomic design principles](https://bradfrost.com/blog/post/atomic-web-design/).

# Development

## Creating a new component

1. Create the `*.tsx` file under src.
2. Update the `src/index.ts` with all the exports you need to expose.
3. Build the npm package `yarn build` (this builds your new component and makes it available to storybook).
4. Create the `*.stories` file under `storybook/src/stories/`.
5. In your story import your new component from the lib folder `import { NewComponet } from '../lib';`.

# Publish the npm package

## Prerequisites

You need to be authorised to access and/or publish the npm package.

Create a personal token (Classic), for details see [GitHub docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

You will need the following scopes

```
 repo (Required - Full access)

 write:packages (Required - For Publishing)
    read:packages  (Required)

 delete:packages (Optional)
```

Create a `.npmrc` file in the root of the project
Copy the config below into the new file, updating YOUR_PERSONAL_ACCESS_TOKEN

```
# Set URL for your scoped packages.
@adatree/atomic-components:registry=https://npm.pkg.github.com

# Set your token to allow you to publish the npm package
//npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
```

## How to publish

1. Increment the version number in `package.json`.
2. Run `yarn package`.
3. Commit the new version.
