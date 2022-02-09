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

    type Query {
        getAllPosts: [Post]
        getPost(id: Int!): Post
        searchPost(keyword: String!): [Post]
    }

    type Mutation {
        uploadPost(title: String!, content: String!, tag: String, writer: String): Post
        deletePost(id: Int!): Post
    }
`;