const fs = require('fs')

let arr = process.argv.slice(2);

if (arr.length > new Set(arr).size) {
    process.stderr.write('Some arguments are duplicated')
    process.exit(-1)
}

let groups = {}
for (let i = 0; i < arr.length; i += 2) {
    groups[arr[i]] = arr[i + 1]
}

let encodingGroup = groups['-c'].split('-');
let inputFile = groups['-i']
let outputFile = groups['-o']

if(!groups.hasOwnProperty('-c') || groups['-c'] === undefined) {
    process.stderr.write('Please enter valid config option')
    process.exit(-1)
}


if(inputFile) {
    try {
        fs.accessSync(inputFile, fs.constants.F_OK | fs.constants.R_OK)
    } 

    catch(err) {
        if(err) {
            process.stderr.write(`Input file ${err.code === 'ENOENT' ? 'does not exist' : 'cannot be read'}.`)
            process.exit(-1)
        }
    }

    if (fs.lstatSync(inputFile).isDirectory()) {
        process.stderr.write('Input file cannot be a directory.')
        process.exit(-1)
    }
}   

const validateEncodingItem = (item) => {
    if(item.length === 1 && item === 'A') return true

    if(item[0] == 'C' || item[0] == 'R') {
        if(item[1] == 1 || item[1] == 0) {
            return true
        }
    }
    return false
}

for(let i = 0; i < encodingGroup.length; i += 1) {
    if(!validateEncodingItem(encodingGroup[i])) {
        process.stderr.write('Please enter valid config option')
        process.exit(-1)
    }
}

module.exports = {
    encodingGroup,
    inputFile,
    outputFile
}