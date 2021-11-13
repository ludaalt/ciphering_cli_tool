const fs = require('fs')

const caesar = require('./caesar')
const atbash = require('./atbash')

const encoding = (operations, input, output) => {

    const readStream = fs.createReadStream(input, 'utf8')
    const writeStream = fs.createWriteStream(output)

    readStream.on('data', function(data) {
        let result = data

        for(let i = 0; i < operations.length; i += 1) {
            let operationsItem = operations[i]

            if(operationsItem == 'C1') result = caesar(result, 1)
            if(operationsItem == 'C0') result = caesar(result, -1)

            if(operationsItem == 'R1') result = caesar(result, 8)
            if(operationsItem == 'R0') result = caesar(result, -8)
            
            if(operationsItem == 'A') result = atbash(result)
        }   

        writeStream.write(result)
    })
}

module.exports = encoding
