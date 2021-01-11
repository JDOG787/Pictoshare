import { gql } from "apollo-server";

export default gql`
    type User {
        username: String!
        _id: ID!
    }
        
    type Query {
        users: [User]
        currentUser: User
        logout: String!
    }

    type Mutation {
        createUser(userInfo: UserInfo): AuthData
        login(loginData: LoginData): AuthData
    }

    input UserInfo {
        username: String!
        email: String!
        password: String!
    }

    input LoginData {
        email: String!
        password: String!
    }

    type AuthData {
        userId: ID!
        accessToken: String!
    }
`;