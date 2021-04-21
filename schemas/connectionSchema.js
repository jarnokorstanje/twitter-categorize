import { gql } from 'apollo-server-express';

export default gql`
    type Connections {
        id: ID
        Title: String
    }
`;