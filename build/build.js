'use strict'
require('./check-versions')()

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
var connect = require('connect')
var serveStatic = require('serve-static')

const spinner = ora(
  'building for ' + process.env.env_config + ' environment...'
)
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red(' Build failed with errors.\n'))
      process.exit(1)
    }
var path1=path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
    console.log(chalk.cyan(' 编译成功.\n'))
    console.log(path1)
    var fs = require('fs');
    var l='copy '+path.join(path1,'../../src/admin/favicon.ico')+' '+path1+'\favicon.ico';
    var cmd=require('node-cmd');
   cmd.run(l)
    console.log(
      chalk.yellow(
        ' Tip: built files are meant to be served over an HTTP server.\n' +
          " Opening index.html over file:// won't work.\n"
      )
    )

    if (process.env.npm_config_preview) {
      const port = 9526
      const host = 'http://localhost:' + port
      const basePath = config.build.assetsPublicPath
      const app = connect()

      app.use(
        basePath,
        serveStatic('./dist', {
          index: ['index.html', '/']
        })
      )

      app.listen(port, function() {
        console.log(
          chalk.green(`> Listening at  http://localhost:${port}${basePath}`)
        )
      })
    }
  })
})
