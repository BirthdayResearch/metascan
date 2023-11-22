import { HttpService } from '@nestjs/axios';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RecaptchaGuard {
  private readonly logger: Logger;

  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger(RecaptchaGuard.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRecaptcha(request);
  }

  async validateRecaptcha(request: Request): Promise<boolean> {
    const response = request.body.recaptchaValue;

    if (!response) {
      this.logger.log('Invalid body in recaptcha request');
      return false;
    }

    const { data } = await this.httpService
      .post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null, // Since we're sending data in the body, set it to null
        {
          params: {
            secret: process.env.SECRET_KEY,
            response,
          },
        },
      )
      .toPromise();
    return data.success;
  }
}
