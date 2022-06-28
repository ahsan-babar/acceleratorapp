'use strict'
const { Event } = require('../models')
const { random, emitter } = require('../utils')
const { getPseudoRandomAlphanumericString, getRandomDate, getPseudoRandomNumber } = random

const generateRandomEvent = username => {

    const startsAt = getRandomDate()
    // Event duration randomly set between 5 - 8 hours
    const endsAt = new Date(new Date(startsAt).setHours(startsAt.getHours() + getPseudoRandomNumber(5, 9)))

    return new Event({
        name: `${getPseudoRandomAlphanumericString()} ${getPseudoRandomAlphanumericString()} ${getPseudoRandomAlphanumericString()}`,
        description: getPseudoRandomAlphanumericString(30),
        startsAt,
        endsAt,
        username
    })
}

const generateRandomEvents = (username, events, max) => {

    events.push(generateRandomEvent(username))
    if (events.length == max)
        emitter.emit('ready')
}


module.exports = {
    generateRandomEvent,
    generateRandomEvents
}