import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ROLES } from '../../../config/roles.config';

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt']) {

    canActivate(context: ExecutionContext) { 
        return super.canActivate(context);
    }

    handleRequest(err, user, info,context:ExecutionContext) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
          throw err || new UnauthorizedException();
        }

        if(user.role === ROLES.SUPER_ADMIN_ROLE) {
            return user;
        } else {
            //handle permission
            let httpRequest=context.switchToHttp();
        }

        return user;
    }

}
