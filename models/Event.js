'use strict'
const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    username: { type: String, required: true, index: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('event', eventSchema)
