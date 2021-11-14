const cipher = (str) => {
    let res = ''

    for(let i = 0; i < str.length; i += 1) {
        let letter = str[i]

        if(/[A-Z]/.test(letter)) {
            res += String.fromCharCode(25 - (letter.charCodeAt(0) - 65) + 65)
        }

        else if(/[a-z]/.test(letter)) {
            res += String.fromCharCode(25 - (letter.charCodeAt(0) - 97) + 97)
        }

        else {
            res += letter
        }
    }

    return res
}

module.exports = cipher