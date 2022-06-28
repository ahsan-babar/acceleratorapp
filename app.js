'use strict'
const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const { events: EventsController } = require('./controllers');
const PORT = 4000
const app = express();

// allow cross-origin requests
app.use(cors());

// connect to local mongoDB database
mongoose.connect('mongodb://localhost:27017/accelerator')
mongoose.connection.once('open', _ => {
    console.log('The database connection has been established successfully');
});

// bind express with graphql
app
    .use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))
    .get('/', (req, res) => { res.send(`Server listening on port ${PORT}`) })
    .get('/events/:username', async (req, res) => { res.send(await EventsController.getEvents({ ...req.params, ...req.query })) })
    .listen(PORT, _ => {
        console.log(`Server listening on port ${PORT}`)
        require('./utils/cron')
    });
