export interface Rule{
    pk?: number,
    name: string,
    creation_datetime?: string,
    update_datetime?: string,
    description: string
}

export class EmptyFormRule implements Rule{
    name: string;
    description: string;
}