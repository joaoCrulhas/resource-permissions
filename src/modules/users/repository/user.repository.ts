import { IRepository } from '../../../infra/database';
import { UserEntity } from '../entities/user.entity';

export class UserRepository implements IRepository<UserEntity> {
  create(data: Partial<UserEntity>): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
