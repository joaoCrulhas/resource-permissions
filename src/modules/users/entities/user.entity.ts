import { User } from '../../../../generated/prisma';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null = null;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    createdAt: Date = new Date(),
    updatedAt: Date | null = null
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromPrisma(user: User) {
    return new UserEntity(
      user.id,
      user.firstName,
      user.lastName,
      user.username,
      user.email,
      user.createdAt,
      user.updatedAt
    );
  }
}
