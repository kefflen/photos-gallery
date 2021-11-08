import { db } from "../database/db";
import { AppError } from "../helpers/Errors";

export class SaveImageUseCase {
  async execute(name: string, path: string) {
    const hasImageWithPath = await db('image').where({ path })
    if (hasImageWithPath) throw new AppError("Can´t register that path", 500) //supostamente nunca vai dar true,a menos que  coloque manualmente no banco de dado
    await db('image').insert({
      name, path
    })
  }
}