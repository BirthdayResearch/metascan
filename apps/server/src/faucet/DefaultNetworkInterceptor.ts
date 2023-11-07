import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { EnvironmentNetwork, getEnvironment } from "@waveshq/walletkit-core";

@Injectable()
export class DefaultNetworkInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { network } = request.query;
    const { networks } = getEnvironment(process.env.NODE_ENV);

    if (!network || !networks.includes(network) ) {
      request.query.network = EnvironmentNetwork.MainNet; // Set your default network here
    }

    return next.handle();
  }
}
