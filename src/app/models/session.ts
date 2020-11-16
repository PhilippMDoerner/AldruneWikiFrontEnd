export interface Session{
    pk?: number,
    is_main_session: boolean,
    is_main_session_int?: number,
    session_number: number,
    session_date: string,
    start_day?: number,
    end_day?: number,
    name?: string
}

export class EmptyFormSession implements Session{
    is_main_session: boolean;
    is_main_session_int?: number;
    session_number: number;
    session_date: string;
    start_day?: number;
    end_day?: number;
}