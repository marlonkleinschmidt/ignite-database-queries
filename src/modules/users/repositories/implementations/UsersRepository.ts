import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM ...
    const UserWithGamesById = await this.repository.findOne(user_id, {relations: ["games"]}) as User;
    return UserWithGamesById;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query ...
    return this.repository.query("select * from users order by first_name asc"); 
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query ...
    return this.repository.query(
      "select * from users where lower(first_name) = lower($1) and lower(last_name) = lower($2)",
      [first_name, last_name]
    ); 
  }
}
