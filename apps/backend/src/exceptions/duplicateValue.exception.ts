import { HttpException, HttpStatus } from "@nestjs/common";

export class DuplicateException extends HttpException {
    constructor() {
      super('An attempt to add a duplicate value', HttpStatus.CONFLICT);
    }
  }
  