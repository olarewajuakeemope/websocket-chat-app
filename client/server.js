import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import devConfig from './webpack.dev';
import prodConfig from './webpack.prod';

const app = express();

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

// Serve the files on port 3000.
app.listen(process.env.PORT || 3000);
