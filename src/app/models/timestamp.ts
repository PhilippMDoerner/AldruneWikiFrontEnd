export interface Timestamp{
    pk?: number,
    name: string,
    time: number,
    encounter?: string
    session_audio: number,
}

export class TimestampObject implements Timestamp{
    constructor(object?: Timestamp){
        if (object) Object.assign(this, object);
    }

    pk?: number;
    name: string;
    time: number;
    encounter?: string;
    session_audio: number;
}