import { gql } from "apollo-server-express";


export default gql`
    type User {
        id: Int!
        username: String!
        password: String!
        perm: Boolean
    }

    type Query {
        userExist(username: String!): Boolean
    }

    type Mutation {
        register(username: String!, password: String!, perm: Boolean): User
        login(username: String!, password: String!): User
    }

`;