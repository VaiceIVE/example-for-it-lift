import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenExpiredOrInvalidException extends HttpException {
    constructor() {
      super('Silent token expired or already used', HttpStatus.FORBIDDEN);
    }
  }
  