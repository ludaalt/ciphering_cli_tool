const caesar = require('./caesar')
const atbash = require('./atbash')
const {encodingGroup} = require('./arguments')

const fs = require('fs')
const { Transform } = require('stream')

const createEncodingStream = () => {
    return new Transform({
        transform(chunk, enc, cb) {            
            let result = encodingFunction(chunk)
            cb(null, result)
        }
    })
}

const encodingFunction = (data) => {
    let result = data.toString()

    for(let i = 0; i < encodingGroup.length; i += 1) {
        let encodingItem = encodingGroup[i]
                     
        if(encodingItem === 'C1') result = caesar(result, 1)
        if(encodingItem === 'C0') result = caesar(result, -1)
    
        if(encodingItem === 'R1') result = caesar(result, 8)
        if(encodingItem === 'R0') result = caesar(result, -8)
                            
        if(encodingItem === 'A') result = atbash(result)
    }    
    return result
} 

module.exports = createEncodingStream