export interface Timestamp{
    pk?: number,
    name: string,
    time: number,
    encounter: string
}

export class EmptyFormTimestamp implements Timestamp{
    name: string;
    time: number;
    encounter: string;
}