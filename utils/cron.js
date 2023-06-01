'use strict'
const axios = require('axios')
const { User, Event } = require('../models')

const { getRandomEmail, getPseudoRandomAlphanumericString } = require('./random')

const INTERVAL = 1 * 60 * 60 * 1000
const MAX_USERS = 5

// Timer callback function to push events in the database 
const callback = async _ => {

    console.log('Initiating background job ...')

    for (let i = 0; i < MAX_USERS; i++) {

        const firstName = getPseudoRandomAlphanumericString()
        const lastName = getPseudoRandomAlphanumericString()
        const username = getRandomEmail()

        console.log(`Consuming events for ${username}`)

        try {
            await User.create({ firstName, lastName, username })
        }
        catch (err) {
            console.log(`Invalid username ${username}. Error: ${err.toString()}`)
            // Retrying with a new username on failure
            i -= 1
            continue;
        }

        // Consuming events from REST API Endpoint
        try {
            const events = await axios.get(`http://localhost:4000/events/${encodeURI(username)}`)
            // Skipping duplicate events with unordered insert
            await Event.insertMany(events?.data?.data, { ordered: false })
        }
        catch (err) {
            console.log('Invalid record.', err.toString())
        }
    }

    console.log('Background job completed ...')

}

setInterval(callback, INTERVAL)
