const { getDublicatedArg, isArgDuplicated, validateEncodingItem, validateInputFile } = require('../src/arguments')

test('should return dublicates', () => {
    expect(getDublicatedArg([1, 2, 3, 4, 4])).toBe(4)
})

test('should detect dublicates', () => {

    const mockExitCode = jest.spyOn(process, 'exit').mockImplementation(() => {})
    const mockExitMessage = jest.spyOn(process.stderr, 'write').mockImplementation(() => {})

    isArgDuplicated([ '-c', 'A', '-i', './input.txt', '-o', './output.txt', '-o'])

    expect(mockExitCode).toHaveBeenCalledWith(-1)
    expect(mockExitMessage.mock.calls[0][0]).toEqual('Error: You provided -o argument more than once')
})

describe('should validate config option', () => {
    test('correct config', () => {
        expect(validateEncodingItem('C0-C1-R0-A')).toBe(true)
    })

    test('uncorrect config', () => {
        expect(validateEncodingItem('A-B-C')).toBe(false)
    })
})

test('should find input file', () => {

    const mockExitCode = jest.spyOn(process, 'exit').mockImplementation((code) => {code})
    const mockExitMessage = jest.spyOn(process.stderr, 'write').mockImplementation(() => {})

    validateInputFile('./input111.txt')

    expect(mockExitCode).toHaveBeenCalledWith(-1)
    expect(mockExitMessage.mock.calls[1][0]).toEqual('Input file does not exist')
})