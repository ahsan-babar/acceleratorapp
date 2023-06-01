'use strict'
const { events: EventsService } = require('../services')
const { emitter } = require('../utils')
const TOTAL_EVENTS = 5000

const getEvents = ({ username, page = 1, size = TOTAL_EVENTS }) => {

    // async flow to avoid blocking caused by for loop

    const events = []

    const callback = _ => {
        EventsService.generateRandomEvents(username, events, size)
    }

    return new Promise((resolve, reject) => {
        emitter.on('ready', function () {
            resolve({
                page,
                pages: Math.ceil(TOTAL_EVENTS / size),
                total: TOTAL_EVENTS,
                data: events
            })
        })

        for (let i = 0; i < size; i++)
            setTimeout(callback, 0)

    })
}

module.exports = {
    getEvents
}