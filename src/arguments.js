let arr = process.argv.slice(2);

let groups = {}

for (let i = 0; i < arr.length; i += 2) {
    groups[arr[i]] = arr[i + 1]
}

module.exports = {
    encoding: groups['-c'],
    inputFile: groups['-i'],
    outputFile: groups['-o']
}