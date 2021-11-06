import { db } from "../database/db";

export class GetImagesUseCase {
  async execute() {
    return await db('image')
  }
}