'use strict'
const { EventEmitter } = require('events')

module.exports = {
    random: require('./random'),
    emitter: new EventEmitter().setMaxListeners(Infinity),
    cron: require('./cron')
}
