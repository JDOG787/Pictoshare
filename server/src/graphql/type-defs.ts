import { gql } from "apollo-server";

export default gql`
    type User {
        username: String
        password: String
        _id: ID
    }

    type AuthData {
        token: String!
        userId: ID!
    }
        
    type Query {
        users: [User]
        userById(id: ID): User
    }

    type Mutation {
        createUser(userInfo: UserInfo): AuthData
    }

    input UserInfo {
        username: String!
        password: String!
    }
`;