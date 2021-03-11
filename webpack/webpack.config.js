const {resolve} = require('path')
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  output:{
    path:resolve(__dirname,'dist'),
    filename:'main.js'
  },
  module:{
    rules:[
      {test:/\.txt$/,use:'raw-loader'}
    ]
  },
  plugin:[
      new webpack.DefinePlugin({
         'process.env.NODE_ENV':JSON.stringify('development'),
         'NODE_ENV':JSON.stringify('production'),
      })
  ]
}
