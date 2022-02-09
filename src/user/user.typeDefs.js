import { gql } from "apollo-server-express";


export default gql`
    type User {
        id: Int!
        username: String!
        password: String!
        perm: Boolean
    }

    type LoginResult {
        success: Boolean!
        token: String
        error: String
    }

    type Query {
        userExist(username: String!): Boolean
        getUser(id: Int!): User
    }

    type Mutation {
        register(username: String!, password: String!, perm: Boolean): User
        login(username: String!, password: String!): LoginResult
        deleteUser(id: Int!): Boolean
    }

`;