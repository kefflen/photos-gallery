import { Request, Response } from 'express'
import { SaveImageUseCase } from '../use-cases'
import fs from 'fs'
import { BadRequestValidator } from '../helpers/Validator'
import { AppError } from '../helpers/errors'

type ErrorHttpResponse = {
  statusCode: number,
  body: {
    [key: string]: string|string[]
  }
}

export class SaveImageController {
  constructor(
    private readonly saveImageUseCase: SaveImageUseCase
  ) {}


  handle = async (request: Request, response: Response) => {
    let path
    try {
      const validator = new BadRequestValidator()
      const { name } = request.body
      path = request.file?.path
      validator.itsNotUndefined(name, "Should pass name to request body")
      validator.itsNotUndefined(path, "Should pass a valid image to request body")
      let error = validator.verifyAsserts()
      if (error) {
        throw error
      }
      const data = await this.saveImageUseCase.execute(name, path as string)
      return response.status(201).json(data)
    } catch (err) {
      console.log(err)
      let httpReponse: ErrorHttpResponse = {statusCode: 500, body: {message: "Unknow error"}}
      if (err instanceof AppError) {
        httpReponse = {statusCode: err.statusCode, body: { messages: err.body} }
      }
      if (path) fs.unlinkSync(path)
      return response.status(httpReponse.statusCode).json(httpReponse.body)
    }
  }
}