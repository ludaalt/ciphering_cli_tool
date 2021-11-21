const fs = require('fs')
let arr = process.argv.slice(2)

const getDublicatedArg = (arr) => {
    let copyOfArr = arr.slice().sort()
    
    for(let i = 0; i < copyOfArr.length; i += 1) {
        if(copyOfArr[i] === copyOfArr[i + 1]) {
            return copyOfArr[i]
        }
    }
}

const isArgDuplicated = (arr) => {
    if (getDublicatedArg(arr)) {
        process.stderr.write(`Error: You provided ${getDublicatedArg(arr)} argument more than once`)
        process.exit(-1)
    }
}

isArgDuplicated(arr)

let groups = {}
let encodingGroup
let inputFile 
let outputFile


const validateEncodingItem = (item) => {
    if(item.length === 1 && item === 'A') return true

    if(item[0] == 'C' || item[0] == 'R') {
        if(item[1] == 1 || item[1] == 0) {
            return true
        }
    }
    return false
}


if(arr.length >= 2) {
    for (let i = 0; i < arr.length; i += 2) {
        groups[arr[i]] = arr[i + 1]
    }
    
    encodingGroup = groups['-c'].split('-');
    inputFile = groups['-i']
    outputFile = groups['-o']

    if(!groups.hasOwnProperty('-c') || groups['-c'] === undefined) {
        process.stderr.write('Please enter valid config option')
        process.exit(-1)
    }

    for(let i = 0; i < encodingGroup.length; i += 1) {
        if(!validateEncodingItem(encodingGroup[i])) {
            process.stderr.write('Please enter valid config option')
            process.exit(-1)
        }
    }
}

const validateInputFile = (file) => {
    try {
        fs.accessSync(file, fs.constants.F_OK | fs.constants.R_OK)
    } 

    catch(err) {
        if(err) {
            process.stderr.write(`Input file does not exist`)
            //process.exit(-1)
        }
    }

    // if (fs.lstatSync(inputFile.tempFilePath).isDirectory()) {
    //     process.stderr.write('Input file cannot be a directory.')
    //     process.exit(-1)
    // }
}

validateInputFile(inputFile)
  


module.exports = {
    getDublicatedArg,
    isArgDuplicated,
    validateEncodingItem,
    validateInputFile,
    encodingGroup,
    inputFile,
    outputFile
}