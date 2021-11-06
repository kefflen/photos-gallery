import { db } from "../database/db";

export class SaveImageUseCase {
  async execute(name: string, path: string) {
    await db('image').insert({name, path
    })
  }
}