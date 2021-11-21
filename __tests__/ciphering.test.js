const atbash = require('../src/atbash')
const caesar = require('../src/caesar')

const strLow = 'abc'
const strUp = 'ABC'

let step

test('should atbash encoding', () => {
    expect(atbash(strLow)).toBe('zyx')
    expect(atbash(strUp)).toBe('ZYX')

    expect(atbash('***').toBe('***'))

    expect(atbash(strLow)).not.toBe('ZYX')
    expect(atbash(strUp)).not.toBe('zyx')
})

test('should caesar encoding', () => {
    expect(caesar(strLow, step = 1)).toBe('bcd')
    expect(caesar(strUp, step = 1)).toBe('BCD')

    expect(caesar(strLow, step = 1)).not.toBe('BCD')
    expect(caesar(strUp, step = 1)).not.toBe('bcd')

    expect(atbash('***').toBe('***'))
})

test('should rot-8 encoding', () => {
    expect(caesar(strLow, step = 8)).toBe('ijk')
    expect(caesar(strUp, step = 8)).toBe('IJK')

    expect(caesar(strLow, step = 8)).not.toBe('IJK')
    expect(caesar(strUp, step = 8)).not.toBe('ijk')

    expect(atbash('***').toBe('***'))
    expect(atbash('abc***').toBe('ijk***'))
})