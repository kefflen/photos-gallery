import { DeleteImageByIdController } from "../../controller/DeleteImageByIdController";
import { DeleteImageByIdUseCase } from "../../use-cases/DeleteImageByIdUseCase";


export function deleteImageByIdControllerFactory() {
  const useCase = new DeleteImageByIdUseCase()
  return new DeleteImageByIdController(useCase)
}