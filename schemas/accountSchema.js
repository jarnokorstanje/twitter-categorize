import { gql } from 'apollo-server-express';

export default gql`
    type Accounts {
        id: ID
        handle: String
    }
`;