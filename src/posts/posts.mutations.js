import client from "../client";
import { loginRequiredResolver } from "../utils";


const uploadPost = async (_, { title, content, tag, writer }, { req }) => {
    try {
        if (!req.session.user || !req.session.user.perm ) {
            throw Error("Not allowed");
        }
        const newPost = await client.post.create({
            data : {
                title,
                content,
                tag,
                writer
            }
        });
        return {
            success: true,
            id: newPost.id
        }
    } catch (error) {
        return {
            success: false,
            error
        }
    }
};
const deletePost = async (_, { id }, { req }) => {
    try {
        if (!req.session.user || !req.session.user.perm) {
            throw Error("Not allowed");
        }
        const deletedPost = await client.post.delete({
            where: { id }
        });
        return {
            success: true,
            id: deletedPost.id
        };
    } catch (error) {
        return {
            success: false,
            error
        }
    }   
};
const updatePost = async (_, { id, title, content, tag, writer }, { req }) => {
    const updatedPost = await client.post.update({
        where: {
            id
        },
        data : {
            title,
            content,
            tag,
            writer
        }
    });
    if (updatedPost?.id) {
        return {
            success: true,
            id: updatedPost.id
        };
    } else {
        return {
            success: false,
            error: "Error: Can't update :("
        }
    }
};  

export default {
    Mutation: {
        uploadPost: loginRequiredResolver(uploadPost),
        deletePost: loginRequiredResolver(deletePost),
        updatePost: loginRequiredResolver(updatePost)
    }
}
