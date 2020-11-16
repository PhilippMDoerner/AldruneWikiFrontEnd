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

export class EmptyFormQuote implements Quote{
    quote:string;
    description: string;
    session: number;
    encounter: number;
}

export class EmptyFormQuoteConnection implements QuoteConnection{
    character: number;
    quote: number;
}