import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { isAddress } from 'ethers';

@Injectable()
export class AddressValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { address } = request.params;
    if (!isAddress(address)) {
      throw new HttpException('Invalid Ethereum address', 400);
    }
    return next.handle();
  }
}
