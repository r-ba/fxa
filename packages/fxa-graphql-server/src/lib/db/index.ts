/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Container } from 'typedi';
import { createConnection, EntityManager, useContainer } from 'typeorm';

import { Account } from './entity/account';

export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export async function createEntityManager(opts: DatabaseConfig): Promise<EntityManager> {
  useContainer(Container);
  const connection = await createConnection({ ...opts, type: 'mysql', entities: [Account] });
  return connection.manager;
}
