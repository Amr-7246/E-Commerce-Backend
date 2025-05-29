"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGraphQLServer = void 0;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const schema_1 = require("./schema");
const setupGraphQLServer = async (app) => {
    const server = new server_1.ApolloServer({ schema: schema_1.schema });
    await server.start();
    app.use('/graphql', (0, express4_1.expressMiddleware)(server));
};
exports.setupGraphQLServer = setupGraphQLServer;
