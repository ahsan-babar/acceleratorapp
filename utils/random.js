'use strict'

const getPseudoRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getPseudoRandomAlphanumericString = ({ length = getPseudoRandomNumber(5, 10), min = 97, max = 58 } = {}) => {

    const toggleNumericRange = _ => {
        min = 48
        max = 58
    }

    const toggleAlphabeticRange = _ => {
        min = 97
        max = 123
    }

    let str = ''
    for (let i = 0; i < length; i++) {

        const toggle = getPseudoRandomNumber(0, 2)
        if (toggle == 0) toggleNumericRange()
        else if (toggle == 1) toggleAlphabeticRange()

        str = str.concat(String.fromCharCode(
            getPseudoRandomNumber(min, max)
        ))
    }
    return str
}

const getRandomDate = ({ start = new Date(), end = new Date(start.setFullYear(start.getFullYear() + 1)) } = {}) =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

const getRandomEmail = _ => `${getPseudoRandomAlphanumericString()}.${getPseudoRandomAlphanumericString()}@${getPseudoRandomAlphanumericString()}.${getPseudoRandomAlphanumericString({ length: 3 })}`

module.exports = {
    getPseudoRandomNumber,
    getPseudoRandomAlphanumericString,
    getRandomDate,
    getRandomEmail
}
