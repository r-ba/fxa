/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Account } from '../entity/account';

@Service()
@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  public findByUid(uid: string) {
    return this.findOne({ uid });
  }
}
