export interface Quote{
    quote: string,
    description: string,
    pk?: number,
    session: number,
    encounter: number,
    connections?: QuoteConnection[],
}

export interface QuoteConnection{
    character: number,
    character_details?: {pk: number, name: string, name_full:string},
    quote: number,
    pk?: number,
}

export class QuoteObject implements Quote{
    quote:string;
    description: string;
    session: number;
    encounter: number;
    pk?: number;

    constructor(object?: Quote){
        if (object) Object.assign(this, object)
    }
}

export class QuoteConnectionObject implements QuoteConnection{
    character: number;
    quote: number;
    pk?: number;

    constructor(object?: QuoteConnection){
        if (object) Object.assign(this, object)
    }
}