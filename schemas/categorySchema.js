import { gql } from 'apollo-server-express';

export default gql`
    type Category {
        id: ID
        userId: String
        title: String
        accounts: [Accounts]
    }
    extend type Query {
        categories(userId: String): [Category]
        category(id: ID!): Category
    }
    extend type Mutation {
        addCategory(
            userId: String
            title: String
            accounts: [NewAccounts]
        ): Category
        modifyCategory(
            id: ID!
            userId: String
            title: String
            accounts: [NewAccounts]
        ): Category
        deleteCategory(id: ID!): ID
    }
    input NewAccounts {
        id: ID
        handle: String
    }
`;