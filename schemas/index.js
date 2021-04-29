import categorySchema from './categorySchema.js';
import accountSchema from './accountSchema.js';
import userSchema from './userSchema.js';
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
    categorySchema,
    accountSchema,
    userSchema,
];