const encoding = require('./src/encoding')
const arguments = require('./src/arguments')

encoding(arguments.encoding.split('-'), arguments.inputFile, arguments.outputFile)