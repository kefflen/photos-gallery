
export class AppError{
  constructor(
    public readonly body: string|string[],
    public readonly statusCode: number
    ) {}

  static badRequest(body: string|string[]) {
    return new this(body, 400)
  }
}