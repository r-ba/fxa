/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { AccountRepository } from '../db/respository/account';
import { Account } from './types/account';

@Service()
@Resolver(of => Account)
export class AccountResolver {
  constructor(@InjectRepository() private readonly accountRepository: AccountRepository) {}

  @Query(returns => Account)
  public account() {
    return this.accountRepository.findByUid('cd2196f0e6b04310ad49cd861d6ea4b6');
  }
}
