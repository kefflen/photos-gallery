import { Request, Response } from "express";
import { GetImagesUseCase } from "../use-cases";


export class GetImagesController {
  constructor(
    private readonly getImagesUseCase: GetImagesUseCase
  ) {}
  handle = async (request: Request, response: Response) => {
    const images = await this.getImagesUseCase.execute()
    return response.json(images)
  }
}