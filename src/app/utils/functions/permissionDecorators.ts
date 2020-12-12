import { DecodedTokenPayload } from 'src/app/models/jwttoken';
import { TokenService } from 'src/app/services/token.service';

export function CurrentUserHasPermissions(requiredPermissions: string[]){
    /**Decorator to execute hasPermissions before the actual function. The original function shall
     * Only run if the user has the required permissions */
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){

        const originalMethod = descriptor.value;
        descriptor.value = function(){
            if (!hasPermissions(requiredPermissions)){
                alert("You do not have the required permission to perform this action!");   
                return;
            }

            return  originalMethod.apply(this, arguments);
        }
        return descriptor;
    }
}

export function hasPermissions(requiredPermissions: string[]): boolean{
    const ownedPermissions = getCurrentUserPermissions();

    for (let requiredPermission of requiredPermissions){
        if (!ownedPermissions.includes(requiredPermission)){
            return false;
        }
    }

    return true;
}

function getCurrentUserPermissions(): string[]{
    const currentUserAccessToken: string = TokenService.getAccessToken();

    if (currentUserAccessToken === null){
        return [];
    }

    const decodedAccessToken: DecodedTokenPayload = TokenService.decodeTokenPayload(currentUserAccessToken);
    return decodedAccessToken.permissions;
}