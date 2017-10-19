# Getting Started

## Setting up the project
### 1. Get the source code

#### Cloning the repository
-->
Just clone this [branch](https://github.com/thinq4yourself/makeme-react):
```sh
$ git clone -b master https://github.com/thinq4yourself/makeme-react react-app
$ cd react-app
```

### 2. Install dependencies

```sh
$ npm install
```

### 3. Run the app

```sh
$ npm start
```
OR
```sh
$ npm run dev
```

This will start the development server with [HMR](https://webpack.github.io/docs/hot-module-replacement) on top of it.

> [http://localhost:3000](http://localhost:3000) — Development server<br>

Now you can open [http://localhost:3000](http://localhost:3000) in your browser and start developing.

---

## Deploying project

You just need to `npm run build`.

That will transpile the `src` code into the `dist` folder together with the files from the `public` folder. Those are all static files, so we can serve them from any CDN. For example:

```
dist
├── 405aaeeb621471c41441dbbf8bfebafb.svg
├── 5f26421b40db121f2420fd2940de3058.woff2
├── app.85942a5af1f7ec8429d1.js
├── base.daa44d9a1070c8ffba16.js
├── icon.png
├── index.html
├── mui.d41d8cd98f00b204e980.js
└── styled.d41d8cd98f00b204e980.js
```

## Standard Workflow

This is structured in a way that makes it easier to work on different parts of the application with distinct focuses.

When introducing a new feature:

1. **Create [`presentational components`](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)**

2. **Create [`containers`](#)**
  
    Then, we can focus on what that feature will do with the app state (`actions`) and which part of the state it will need (`selectors`).

3. **Write [`redux module tests`](./Testing.md#Testing-Redux)** (recommended)

    After creating containers, we'll have a good sense of what `actions` and `selectors` we'll need. We can write integration tests to make sure that we'll have proper state when dispatching an action.

4. **Create [`redux modules`](./Redux.md)**

    The last step is to figure out how `reducers` and/or `sagas` will respond to dispatched actions so we can modify the app state and/or make side effects.

## Services
We can think of a service as an internal `node_modules` folder. Instead of separating our modules into `utils`, `helpers`, `middlewares` etc., which makes us waste more time thinking where to put our internal module, we have just one place: `services`.

Examples of services:

- [`api`](./Redux.md#api-service) - module that handles API calls;
- `validation` - basic validation helper for forms.

## Webpack
This uses [`webpack-blocks`](https://github.com/andywer/webpack-blocks) to provide a minimal and modular webpack config. 