import { gql } from "apollo-server-express";

export default gql`
    type Post {
        id:  Int! 
        writer:  String!
        title: String!
        tag: String!
        content:  String!
        createdAt:   String!
        updatedAt:   String!
    }
    type MutationResult {
        success: Boolean!
        id: Int
        error: String
    }
    type Query {
        getAllPosts: [Post]
        getPost(id: Int!): Post
        searchPost(keyword: String!): [Post]
    }

    type Mutation {
        uploadPost(title: String!, content: String!, tag: String, writer: String): MutationResult
        deletePost(id: Int!): MutationResult
    }
`;