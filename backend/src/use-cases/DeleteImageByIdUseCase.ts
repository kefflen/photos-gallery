import { db } from "../database/db";
import fs from 'fs'

export class DeleteImageByIdUseCase {
  async execute(id: number) {
    let success
    const image = await db('image').where({ id }).first()
    if (image) {
      success = await db('image').where({ id }).delete()
      fs.unlinkSync(image.path)
    }
    return success
  }
}