import { Request, Response } from 'express'
import { SaveImageUseCase } from '../use-cases'

export class SaveImageController {
  constructor(
    private readonly saveImageUseCase: SaveImageUseCase
  ) {}

  handle = async (request: Request, response: Response) => {
    try {
      console.log(request.body)
      const { name } = request.body
      const path = request.file?.path
      if (!name) return response.status(400).json({message: "Should pass name to request body"})
      if (!path) return response.status(400).json({message: "Should pass a valid image to request body"})
      const data = await this.saveImageUseCase.execute(name, path)
      return response.status(201).json(data)
    } catch (err) {
      console.log(err)
      return response.status(500).json({message: 'Unknow error'})
    }
  }
}