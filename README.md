# ramber-template

The default [Ramber](https://github.com/hamberjs/ramber) template, available for Rollup and webpack.


## Getting started


### Using `degit`

`degit` is a scaffolding tool that lets you create a directory from a branch in a repository. Use either the `rollup` or `webpack` branch in `ramber-template`:

```bash
# for Rollup
npx degit "hamberjs/ramber-template#rollup" my-app
# for webpack
npx degit "hamberjs/ramber-template#webpack" my-app
```


### Running the project

However you get the code, you can install dependencies and run the project in development mode with:

```bash
cd my-app
npm install # or yarn
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [ramberjs.web.app](https://ramberjs.web.app) for help getting started.


## Structure

Ramber expects to find two directories in the root of your project —  `src` and `static`.


### src

The [src](src) directory contains the entry points for your app — `client.js`, `server.js` and (optionally) a `service-worker.js` — along with a `template.html` file and a `routes` directory.


#### src/routes

This is the heart of your Ramber app. There are two kinds of routes — *pages*, and *server routes*.

**Pages** are Hamber components written in `.hamber` files. When a user first visits the application, they will be served a server-rendered version of the route in question, plus some JavaScript that 'hydrates' the page and initialises a client-side router. From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel. (Ramber will preload and cache the code for these subsequent pages, so that navigation is instantaneous.)

**Server routes** are modules written in `.js` files, that export functions corresponding to HTTP methods. Each function receives Express `request` and `response` objects as arguments, plus a `next` function. This is useful for creating a JSON API, for example.

There are three simple rules for naming the files that define your routes:

* A file called `src/routes/about.hamber` corresponds to the `/about` route. A file called `src/routes/blog/[slug].hamber` corresponds to the `/blog/:slug` route, in which case `params.slug` is available to the route
* The file `src/routes/index.hamber` (or `src/routes/index.js`) corresponds to the root of your app. `src/routes/about/index.hamber` is treated the same as `src/routes/about.hamber`.
* Files and directories with a leading underscore do *not* create routes. This allows you to colocate helper modules and components with the routes that depend on them — for example you could have a file called `src/routes/_helpers/datetime.js` and it would *not* create a `/_helpers/datetime` route


### static

The [static](static) directory contains any static assets that should be available. These are served using [sirv](https://github.com/lukeed/sirv).

In your [service-worker.js](src/service-worker.js) file, you can import these as `files` from the generated manifest...

```js
import { files } from '@ramber/service-worker';
```

...so that you can cache them (though you can choose not to, for example if you don't want to cache very large files).


## Bundler config

Ramber uses Rollup or webpack to provide code-splitting and dynamic imports, as well as compiling your Hamber components. With webpack, it also provides hot module reloading. As long as you don't do anything daft, you can edit the configuration files to add whatever plugins you'd like.


## Production mode and deployment

To start a production version of your app, run `npm run build && npm start`. This will disable live reloading, and activate the appropriate bundler plugins.

You can deploy your application to any environment that supports Node 10 or above. As an example, to deploy to [Vercel Now](https://vercel.com) when using `ramber export`, run these commands:

```bash
npm install -g vercel
vercel
```

## Using external components

When using Hamber components installed from npm, such as [@hamberjs/hamber-virtual-list](https://github.com/hamberjs/hamber-virtual-list), Hamber needs the original component source (rather than any precompiled JavaScript that ships with the component). This allows the component to be rendered server-side, and also keeps your client-side app smaller.

Because of that, it's essential that the bundler doesn't treat the package as an *external dependency*. You can either modify the `external` option under `server` in [rollup.config.js](rollup.config.js) or the `externals` option in [webpack.config.js](webpack.config.js), or simply install the package to `devDependencies` rather than `dependencies`, which will cause it to get bundled (and therefore compiled) with your app:

```bash
npm install -D @hamberjs/hamber-virtual-list
```


## Bugs and feedback

Ramber is in early development, and may have the odd rough edge here and there. Please be vocal over on the [Ramber issue tracker](https://github.com/hamberjs/ramber/issues).
