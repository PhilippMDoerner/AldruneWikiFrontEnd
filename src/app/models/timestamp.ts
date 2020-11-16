export interface Timestamp{
    pk?: number,
    name: string,
    time: number,
    encounter: string
}

export class TimestampObject implements Timestamp{
    name: string;
    time: number;
    encounter: string;
}