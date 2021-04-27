import { gql } from 'apollo-server-express';

export default gql`
    type Category {
        id: ID
        UserId: String
        Title: String
        Accounts: [Accounts]
    }
    extend type Query {
        categories(userId: String): [Category]
        category(id: ID!): Category
    }
    extend type Mutation {
        addCategory(
            UserId: String
            Title: String
            Accounts: [NewAccounts]
        ): Category
        modifyCategory(
            id: ID!
            UserId: String
            Title: String
            Accounts: [NewAccounts]
        ): Category
        deleteCategory(id: ID!): ID
    }
    input NewAccounts {
        id: ID
        Handle: String
    }
`;