import { describe, expect, it } from 'vitest';
import {
  createUserControllerFactory,
  getUsersControllerFactory,
} from '@users/controllers/controllers.factory';
import { GetUsersController } from '@users/controllers/get-users.controller';
import { CreateUserController } from '@users/controllers/create-user.controller';

describe('ControllersFactory', () => {
  it('should return a GetUsersControllers instance for the getUsers factory', () => {
    const received = getUsersControllerFactory();
    expect(received).toBeDefined();
    expect(received).toBeInstanceOf(GetUsersController);
  });

  it('should return an instance of CreateUserController', () => {
    const received = createUserControllerFactory();
    expect(received).toBeDefined();
    expect(received).toBeInstanceOf(CreateUserController);
  });
});
