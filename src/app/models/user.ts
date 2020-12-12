export interface User{
    username: string,
    password?: string,
    pk?: number,
    api_permissions?: string[],
}

export class UserObject implements User{
    username: string;
    password?: string;
    pk?: number;
    api_permissions?: string[];

    constructor(object?: User){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return ""
    }
}