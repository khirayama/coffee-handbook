# COFFEE HANDBOOK - 珈琲手帖 -

## Requirements

- nodejs
- npm

## Development

- Create .envrc
- Install packages and run app

### [OPTIONAL] Set google analytics code

```sh
$ cp .envrc.sample .envrc
```

Then please fill `GOOGLE_ANALYTICS_CODE` if you want.

### Set mapbox token

```sh
$ vim .envrc
```

Please fill `MAPBOX_TOKEN`. `MAPBOX_TOKEN` is required.
Please check here. https://www.mapbox.com/

### Install packages and run app

```sh
$ npm install
$ npm run dev
```

## Add a store

```
$ npm run generate:store
$ npm run precommit
// If you need to update, please edit generated file directly.
// After this, please make a PR.
```
