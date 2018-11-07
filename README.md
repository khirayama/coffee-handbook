# COFFEE HANDBOOK - 珈琲手帖 -

## Requirements

- nodejs
- npm

## Development

- [OPTIONAL] Set google analytics code
- Set mapbox token
- Install packages and run app
- [OPTIONAL] Set virtual host

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

## Load `.envrc`

Load `.envrc` like following command.

```sh
$ source .envrc
```

I recommend to use `direnv`. Please check [here about direnv](https://direnv.net/).

### Install packages and run app

```sh
$ npm install
$ npm run dev
```

### [OPTIONAL] Set virtual host

```sh
$ sudo vim /etc/hosts
// Add '127.0.0.1 example.com'
// Add '127.0.0.1 ja.example.com'
$ sudo killall -HUP mDNSResponder // It depends on OS, please change this line for your OS.
$ sudo apachectl restart
// You can get access to example.com and ja.example.com.
```

## Add a store

```
$ npm run generate:store
$ npm run precommit
// If you need to update, please edit generated file directly.
// After this, please make a PR.
```
