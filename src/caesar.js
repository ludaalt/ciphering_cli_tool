const cipher = (str, step) => {
    if(step < 0) {
        return cipher(str, step + 26)
    }

    let res = ''

    for(let i = 0; i < str.length; i += 1) {
        let letter = str[i]

        if(/[A-Z]/.test(letter)) {
            res += String.fromCharCode( ((letter.charCodeAt(0) - 65 + step) % 26) + 65)
        }

        else if(/[a-z]/.test(letter)) {
            res += String.fromCharCode( ((letter.charCodeAt(0) - 97 + step) % 26) + 97)
        }

        else {
            res += letter
        }
    }

    return res
}

module.exports = cipher