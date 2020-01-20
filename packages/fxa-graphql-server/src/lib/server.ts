/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ApolloServer, Config } from 'apollo-server';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';

import { createEntityManager, DatabaseConfig } from './db';
import { AccountResolver } from './resolvers/account-resolver';

type ServerConfig = {
  database: DatabaseConfig;
};

export async function createServer(config: ServerConfig): Promise<ApolloServer> {
  await createEntityManager(config.database);

  const schema = await TypeGraphQL.buildSchema({
    container: Container,
    resolvers: [AccountResolver]
    // Add Auth checker here
  });

  return new ApolloServer({
    context: () => {
      return {};
    },
    schema
  });
}
