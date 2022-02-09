require('dotenv').config();
import express from "express";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import http from "http";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";
async function startServer(schema) {
    const PORT = process.env.PORT ?? 4000;
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
    }

    const app = express();
    // Middleware setting
    app.use(session({
        name: "session",
        secret: process.env.SECRET,
        cookie: {
            sameSite: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        resave: false,
        saveUninitialized: false,
    }));
    const httpServer = http.createServer(app);
    // Apollo Server Setting
    const server = new ApolloServer({
        schema,
        context: ({req}) => ({req}),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageProductionDefault({ footer: true })
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