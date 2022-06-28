'use strict'

const graphql = require('graphql');
const { Event } = require('../models');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = graphql;

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: _ => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        startsAt: { type: GraphQLString },
        endsAt: { type: GraphQLString },
        username: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        events: {
            type: new GraphQLList(EventType),
            args: {
                username: { type: GraphQLString },
                skip: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            },
            resolve(_, args) {
                return Event.find({ username: args.username })
                    .skip(args.skip || 0)
                    .limit(args.limit || 0)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
