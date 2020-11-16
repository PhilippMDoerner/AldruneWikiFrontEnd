import { Session } from 'src/app/models/session';

export interface OverviewItem{
    name: string,
    pk: number,
    name_full: string,
    player_character?: boolean,
    author?: string,
    parent_location_name?: string,
    session_details?: Session,
    download_url?: string,
}