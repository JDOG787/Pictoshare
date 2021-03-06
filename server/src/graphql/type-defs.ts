import { gql } from "apollo-server";

export default gql`
    type User {
        username: String!
        _id: ID!
    }

    type Author {
        userId: String!
        username: String!
    }

    type Post {
        body: String!
        author: Author!
    }
        
    type Query {
        users: [User]
        currentUser: User
        logout: String!
        feed: [Post]
        userById(id: ID!): User!
    }

    type Mutation {
        createUser(userInfo: UserInfo!): Boolean
        login(loginData: LoginData!): Boolean
        createPost(body: String!): Boolean
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
`;