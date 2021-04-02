export interface User{
    username: string,
    password?: string,
    pk?: number,
    api_permissions?: string[],
    groups?: number[],
    is_staff?: boolean,
    is_superuser?: boolean,
    email?: string,
}

export class UserObject implements User{
    username: string;
    email?: string;
    password?: string;
    pk?: number;
    api_permissions?: string[];
    is_staff: boolean;
    is_superuser: boolean;
    groups?: number[];

    constructor(object?: User){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return ""
    }
}