import { AppError } from "./errors"

export class BadRequestValidator {
  #errors: string[]
  constructor() {
    this.#errors = []
  }
  itsNotUndefined(value: any, message: string) {
    if (value === undefined) this.#errors.push(message)
  }
  verifyAsserts() {
    if (this.#errors.length > 0) {
      return new AppError(this.#errors, 400)
    }
  }
}