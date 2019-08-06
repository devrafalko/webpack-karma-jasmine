### Installation

This boilerplate package will let you use `karma` in your projects.  
Use `npm install webpack-karma-jasmine` instead of installing all dependencies and loaders separately.

> If you want to test your `.html` files with **DOM** see [karma-html](https://www.npmjs.com/package/karma-html) package.

This package is the suggestion of karma configuration. It uses:
* `karma-webpack` and `babel-loader` to compile ES2015 javascript features and bundle **specs** and **tests** `.js` files together
* `karma-jasmine` *(to use another framework, install it manually)*
* `karma-mocha-reporter` bash reporter
* `karma-jasmine-html-reporter` browser reporter

### Sample
`git clone https://github.com/devrafalko/webpack-karma-jasmine.git`  
`cd webpack-karma-jasmine/sample`  
`npm install`  
`npm test`

### Configuration
This is the full description of the sample above.

#### 1. Install all dependencies
```javascript
npm install webpack webpack-cli webpack-karma-jasmine
```

#### 2. create `karma.conf.js` file
The suggestion of `karma.conf.js` configuration

```javascript
module.exports = function (config) {
  config.set({
    //root path location to resolve paths defined in files and exclude
    basePath: '',
    //files/patterns to exclude from loaded files
    exclude: [],
    //files/patterns to load in the browser
    files: [
      { pattern: 'tests/*.js', watched: true, served: true, included: true }
      /*parameters:
          watched: if autoWatch is true all files that have set watched to true will be watched for changes
          served: should the files be served by Karma's webserver?
          included: should the files be included in the browser using <script> tag?
          nocache: should the files be served from disk on each request by Karma's webserver? */
      /*assets:
          {pattern: '*.html', watched:true, served:true, included:false}
          {pattern: 'images/*', watched:false, served:true, included:false} */
    ],

    //executes the tests whenever one of watched files changes
    autoWatch: true,
    //if true, Karma will run tests and then exit browser
    singleRun: false,
    //if true, Karma fails on running empty test-suites
    failOnEmptyTestSuite: false,
    //reduce the kind of information passed to the bash
    logLevel: config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG

    //list of frameworks you want to use, only jasmine is installed with this boilerplate
    frameworks: ['jasmine'],
    //list of browsers to launch and capture
    browsers: ['Chrome'/*,'PhantomJS','Firefox','Edge','ChromeCanary','Opera','IE','Safari'*/],
    //list of reporters to use
    reporters: ['mocha', 'kjhtml'/*,'dots','progress','spec'*/],

    //address that the server will listen on, '0.0.0.0' is default
    listenAddress: '0.0.0.0',
    //hostname to be used when capturing browsers, 'localhost' is default
    hostname: 'localhost',
    //the port where the web server will be listening, 9876 is default
    port: 9876,
    //when a browser crashes, karma will try to relaunch, 2 is default
    retryLimit: 0,
    //how long does Karma wait for a browser to reconnect, 2000 is default
    browserDisconnectTimeout: 5000,
    //how long will Karma wait for a message from a browser before disconnecting from it, 10000 is default
    browserNoActivityTimeout: 10000,
    //timeout for capturing a browser, 60000 is default
    captureTimeout: 60000,

    client: {
      //capture all console output and pipe it to the terminal, true is default
      captureConsole: false,
      //if true, Karma clears the context window upon the completion of running the tests, true is default
      clearContext: false,
      //run the tests on the same window as the client, without using iframe or a new window, false is default
      runInParent: false,
      //true: runs the tests inside an iFrame; false: runs the tests in a new window, true is default
      useIframe: true,
      jasmine: {
        //tells jasmine to run specs in semi random order, false is default
        random: false
      }
    },

    /* karma-webpack config
       pass your webpack configuration for karma
       add `babel-loader` to the webpack configuration to make 
       the ES6+ code in the test files readable to the browser  
       eg. import, export keywords */
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/i,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    },
    preprocessors: {
      //add webpack as preprocessor to support require() in test-suits .js files
      './tests/*.js': ['webpack']
    },
    webpackMiddleware: {
      //turn off webpack bash output when run the tests
      noInfo: true,
      stats: 'errors-only'
    },

    /*karma-mocha-reporter config*/
    mochaReporter: {
      output: 'noFailures'  //full, autowatch, minimal
    }
  });
};
```

#### 3. adjust the folders structure to your needs
* Adjust `basePath` and `excludes` property, `files` `pattern` properties,  and `preprocessors` properties to your need.
* The configuration assumes that the following folder structure is arranged in the following way:
```
┌ karma.conf.js
├ package.json
├ webpack.config.js
├ src
│  ├ index.js
│  └ another_module.js
└ tests
   ├ spec_a.js
   └ spec_b.js
```

#### 4. Add some specs to your test files

##### `tests/spec_a.js`
```javascript
import myModule from './../src/index.js';

describe("Module should return", function () {
  it("some number", function () {
    expect(myModule()).toEqual(10);
  });
});
```

##### `src/index.js`
```javascript
export default ()=> 10;
```

#### 5. Run tests:
* add `"scripts": { "test": "karma start" }` to your `package.json` and run tests with `npm test`
* or run `karma start` in the terminal *(but first install `karma-cli` globally)*
```bash
> npm install karma-cli -g
```

### Links
* [karma configuration file docs](http://karma-runner.github.io/1.0/config/configuration-file.html)
* [karma files docs](http://karma-runner.github.io/1.0/config/files.html)
* [webpack-babel-installer](https://www.npmjs.com/package/webpack-babel-installer)
* [babel presets docs](https://babeljs.io/docs/plugins/)
* [babel-loader](https://www.npmjs.com/package/babel-loader)
* [karma-webpack (webpack docs)](https://github.com/webpack/docs/wiki/usage-with-karma)
* [karma-webpack (github docs)](https://github.com/webpack-contrib/karma-webpack)
* [jasmine docs](https://jasmine.github.io/api/edge/global)
* [karma-jasmine docs](https://github.com/karma-runner/karma-jasmine)

###### Launchers
* [karma-phantomjs-launcher](https://www.npmjs.com/package/karma-phantomjs-launcher)
* [karma-chrome-launcher](https://www.npmjs.com/package/karma-chrome-launcher)
* [karma-firefox-launcher](https://www.npmjs.com/package/karma-firefox-launcher)
* [karma-edge-launcher](https://www.npmjs.com/package/karma-edge-launcher)
* [karma-ie-launcher](https://www.npmjs.com/package/karma-ie-launcher)
* [karma-opera-launcher](https://www.npmjs.com/package/karma-opera-launcher)
* [karma-safari-launcher](https://www.npmjs.com/package/karma-safari-launcher)

###### Reporters
* [karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter)
* [karma-spec-reporter](https://www.npmjs.com/package/karma-spec-reporter)
* [karma-jasmine-html-reporter](https://www.npmjs.com/package/karma-jasmine-html-reporter)

### See also
* [karma-html](https://www.npmjs.com/package/karma-html) *(test your `.html` files in the browser)*
* [jasmine-dom-custom-matchers](https://www.npmjs.com/package/jasmine-dom-custom-matchers)
* [webpack-jquery-ui](https://www.npmjs.com/package/webpack-jquery-ui)
* [webpack-icons-installer](https://www.npmjs.com/package/webpack-icons-installer)
* [styles-loader](https://www.npmjs.com/package/styles-loader)
