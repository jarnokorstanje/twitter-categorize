import stationSchema from './stationSchema.js';
import connectionSchema from './connectionSchema.js';
import { gql } from 'apollo-server-express';

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
         _: Boolean
    }
`;

export default [
    linkSchema,
    stationSchema,
    connectionSchema,
];