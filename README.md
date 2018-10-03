# COFFEE HANDBOOK - 珈琲手帖 -

## Requirements

- nodejs
- npm

## Development

- [OPTIONAL] Set google analytics code
- Install packages and run app

### [OPTIONAL] Set google analytics code

Fill gaCode in `src/secret.ts` for your gaCode.

### Install packages and run app

```sh
$ npm install
$ npm run dev
```

## Add store

```
$ npm run generate:store
$ npm run precommit
```

### Data Structure

- Data: 多言語対応の生データ
- Resouces: Dataを扱いやすいようにするwrapper。特に言語の解決。
- Post: data/resourcesのベースになる通常のPost。他のリソースは、このdata部分にそれぞれ特有のデータを持つ。
