require('dotenv').config();
import express from "express";
import session from "cookie-session";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
async function startServer(schema) {
    const PORT = process.env.PORT ?? 4000;
    const corsOptions = {
        origin: /https?:\/\/blog.bbangjo.kr$/,// process.env.NODE_ENV === "production" ? /https?:\/\/blog.bbangjo.kr$/ : /http:\/\/localhost:(3|4)000/,
        credentials: true,
    }
    const app = express();
    app.disable('x-powered-by');
    app.set('trust-proxy', 1);
    // Middleware setting
    app.use(session({
        name: "session",
        secret: process.env.SECRET,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        resave: false,
        saveUninitialized: false,
    }));
    const httpServer = http.createServer(app);
    // Apollo Server Setting
    const server = new ApolloServer({
        schema,
        context: ({req}) => ({req}),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],

    });
    await server.start();

    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: corsOptions,
    });

    await new Promise(resolve => httpServer.listen({port: PORT}, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}
startServer(schema);