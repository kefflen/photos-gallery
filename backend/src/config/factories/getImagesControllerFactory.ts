import { GetImagesController } from "../../controller/GetImagesController";
import { GetImagesUseCase } from "../../use-cases";



export function getImagesControllerFactory() {
  const getImagesUseCase = new GetImagesUseCase()
  return new GetImagesController(getImagesUseCase)
}