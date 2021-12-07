const fs = require('fs')
const createEncodingStream = require('./src/encoding')
const arguments = require('./src/arguments') 

const readStream = arguments.inputFile ? fs.createReadStream(arguments.inputFile, 'utf8') : process.stdin
const writeStream = arguments.outputFile ? fs.createWriteStream(arguments.outputFile) : process.stdout

readStream.pipe(createEncodingStream()).pipe(writeStream)