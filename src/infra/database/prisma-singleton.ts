import { PrismaClient } from '../../../generated/prisma';

export class PrismaSingleton {
  private static instance: PrismaClient;
  public static getInstance() {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }
    return PrismaSingleton.instance;
  }
}
