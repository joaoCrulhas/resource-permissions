export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date | null = null;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    created_at: Date = new Date(),
    updated_at: Date | null = null
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
