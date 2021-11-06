import { SaveImageController } from "../../controller/SaveImageController";
import { SaveImageUseCase } from "../../use-cases";

export function saveImageControllerFactory() {
  const saveImageUseCase = new SaveImageUseCase()
  const saveImageController = new SaveImageController(saveImageUseCase)
  return saveImageController
}