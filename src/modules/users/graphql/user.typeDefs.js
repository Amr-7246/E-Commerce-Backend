"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.userTypeDefs = (0, graphql_tag_1.gql) `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }
`;
