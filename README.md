# Atomic components

# Creating a new component

1. Create the `*.tsx` file under src
2. Update the `src/index.ts` with all the exports you need to expose
3. Build the npm package `yarn build`
4. Create the `*.stories` file under `storybook/src/stories/`
5. In your story import your new component from the lib folder `import { NewComponet } from '../lib';`

# Development

# Publish the npm package

## Prerequisites

You need to be authorised to publish the npm package

Create a personal token, for details see [Gitlab docs](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)

- In the top-right corner, select your avatar.
- Select Edit profile.
- On the left sidebar, select Access Tokens.
- Enter `@adatree-oss/atomic-components` for the name and an optional expiry date for the token.
- Select the `api` scope.
- Select Create personal access token.

Create a `.npmrc` file in the root of the project
Copy the config into the new file

```
# Set URL for your scoped packages.
@adatree-oss/atomic-components:registry=https://gitlab.com/api/v4/projects/32542974/packages/npm/

# Set your token to allow you to publish the npm package
//gitlab.com/api/v4/projects/32542974/packages/npm/:_authToken=<YOUR_PERSONAL_ACCESS_TOKEN>
```

## How to publish

Increment the version number in `package.json`

Run `npm publish`

Commit the new version number
