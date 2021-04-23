import { gql } from 'apollo-server-express';

export default gql`
    type Category {
        id: ID
        Title: String
        Accounts: [Accounts]
    }
    extend type Query {
        categories(start: Int, limit: Int): [Category]
        category(id: ID!): Category
    }
    extend type Mutation {
        addCategory(
            Title: String
            Accounts: [NewAccounts]
        ): Category
        modifyCategory(
            id: ID!
            Title: String
            Accounts: [NewAccounts]
        ): Category
        deleteCategory(id: ID!): ID
    }
    input NewAccounts {
        id: ID
        Title: String
    }
`;