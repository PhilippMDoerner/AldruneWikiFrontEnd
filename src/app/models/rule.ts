export interface Rule{
    id?: number,
    name: string,
    creation_datetime?: string,
    update_datetime?: string,
    description: string
}

export class RuleObject implements Rule{
    id?: number;
    name: string;
    creation_datetime?: string;
    update_datetime?: string;
    description: string;

    constructor(object?: Rule){
        if (object) Object.assign(this, object)
    }
}