'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(p, needsSlash) {
  const hasSlash = p.endsWith('/');
  if (hasSlash && !needsSlash) {
    return p.substr(p, p.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${p}/`;
  } else {
    return p;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl ||
    (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appNodeModules: resolveApp('node_modules'),
  appOptions: resolveApp('src/options.tsx'),
  appPopup: resolveApp('src/popup.tsx'),
  optionsTemplate: resolveApp('src/templates/options.html'),
  popupTemplate: resolveApp('src/templates/popup.html'),
  appPackageJson: resolveApp('package.json'),
  dotenv: resolveApp(`env/${process.env.NODE_ENV}.env`),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('src/setupTests.ts'),
  yarnLockFile: resolveApp('yarn.lock'),
  appTsConfig: resolveApp('tsconfig.json'),
  appTsLint: resolveApp('tslint.json'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};
