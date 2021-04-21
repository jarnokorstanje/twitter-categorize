import { gql } from 'apollo-server-express';

export default gql`
    type Station {
        id: ID
        Title: String
        Connections: [Connections]
    }
    extend type Query {
        stations(start: Int, limit: Int): [Station]
        station(id: ID!): Station
    }
    extend type Mutation {
        addStation(
            Title: String
            Connections: [NewConnections]
        ): Station
        modifyStation(
            id: ID!
            Title: String
            Connections: [NewConnections]
        ): Station
        deleteStation(id: ID!): ID
    }
    input NewConnections {
        id: ID
        Title: String
    }
`;