export interface Timestamp{
    "pk"?: number,
    "name": string,
    "time": number,
    "encounter": string
}

export class EmptyFormTimestamp{
    "name": string = null;
    "time": number = null;
    "encounter": string = null;
}