/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common')

module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}`)
  return merge(baseConfig, envConfig)
}
