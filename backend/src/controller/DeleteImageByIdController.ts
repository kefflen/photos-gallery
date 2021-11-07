import { Request, Response } from "express"
import { DeleteImageByIdUseCase } from "../use-cases/DeleteImageByIdUseCase"


export class DeleteImageByIdController {
  constructor(
    private readonly deleteImageByIdUseCase: DeleteImageByIdUseCase
  ) {}
  handle = async (request: Request, response: Response) => {
    const { id: idParam } = request.params
    
    const id = Number(idParam)
    if (isNaN(id)) return response.status(400).json({ message: "Id need to be a number"})
    const success = await this.deleteImageByIdUseCase.execute(id)
    return response.status(200).json({ id, success: !!success})
  }
}