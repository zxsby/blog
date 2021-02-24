import json from '@rollup/plugin-json'
// rollup的配置
// console.log(process.env.TARGET)
import path from 'path'
import resolvePlugin from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'

//根据环境变量中的target属性，获取对应模块中package.json

const packagesDir = path.resolve(__dirname,'packages') // 找到packages


//打包的基准目录
const packageDir = path.resolve(packagesDir,process.env.TARGET) //找到要打包的某个包

//永远针对的是某个模块
const resolve = (p) => path.resolve(packageDir,p)

const pkg = require(resolve('package.json'))//找到package.json文件


const name = path.basename(packageDir) // 文件名
//对打包类型先做一个映射表，根据你提供的formats来格式话打包内容
const outputConfig = {
  'esm-bundler':{
    file:resolve(`dist/${name}.esm-bundler.js`),
    format:'es'
  },
  'cjs':{
    file:resolve(`dist/${name}.cjs.js`),
    format:'cjs'
  },
  'global':{
    file:resolve(`dist/${name}.global.js`),
    format:'iife' //立即执行函数
  }
}

const options = pkg.buildOptions //自己在package.json中定义的选项

function createConfig(format,output){
  output.name = options.name;
  output.sourcemap = true //生成sourcemap

  //生成rollup配置
  return {
    input: resolve(`src/index.ts`),
    output,
    plugins:[
      json(),
      ts({
        tsconfig: path.resolve(__dirname,'tsconfig.json')
      }),
      resolvePlugin() // 解析第三方模块
    ]
  }
}

// rollup 最终需要导出配置
export default options.formats.map(format => createConfig(format,outputConfig[format]))
