/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { intBoolTransformer, uuidTransformer } from '../transformers';

@Entity({ name: 'accounts' })
@Unique(['normalizedEmail'])
export class Account {
  @PrimaryColumn({ type: 'binary', width: 16, transformer: uuidTransformer })
  public readonly uid!: string;

  @Column({ type: 'varchar', width: 255, nullable: false })
  public normalizedEmail!: string;

  @Column({ type: 'varchar', width: 255, nullable: false })
  public email!: string;

  @Column({
    default: 0,
    nullable: false,
    transformer: intBoolTransformer,
    type: 'tinyint',
    width: 1
  })
  public emailVerified!: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  public createdAt!: number;
}
