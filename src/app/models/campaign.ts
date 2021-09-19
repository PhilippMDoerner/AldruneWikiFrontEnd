import { ArticleObject } from './base-models';
import { Image } from './image';
import { Constants } from '../app.constants';
import { User } from './user';

export interface BaseCampaignData{
    name: string;
    subtitle: string;
    pk?: number;
    background_image?: string;
    icon?: string;
    default_map?: number;
    default_map_details?: {pk: number, name: string};
    is_deactivated: boolean;
    has_audio_recording_permission: boolean;
}

export interface Campaign extends BaseCampaignData{
    members?: User[];
    admins?: User[];
    guests?: User[];

    member_group_name?: string;
    admin_group_name?: string;
    guest_group_name?: string;
}

export interface CampaignOverview extends BaseCampaignData{
    isMember: boolean;
    isAdmin: boolean;
    isGuest: boolean;
}

export class CampaignObject implements Campaign{
    pk?: number;
    name: string;
    subtitle: string;
    background_image: string;
    icon: string;
    default_map?: number;
    default_map_details?: {pk: number, name: string};
    is_deactivated: boolean;
    has_audio_recording_permission: boolean;

    members?: User[];
    admins?: User[];
    guests?: User[];
    
    member_group_name?: string;
    admin_group_name?: string;
    guest_group_name?: string;

    constructor(object?: Campaign){
        if (object) Object.assign(this, object);
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/admin` ;
    }
}


export interface WikiStatistics{
    creature_count: number;
    character_count: number;
    diaryentry_count: number;
    encounter_count: number;
    item_count: number;
    location_count: number;
    map_count: number;
    marker_count: number;
    organization_count: number;
    quest_count: number;
    quote_count: number;
    rule_count: number;
    session_audio_count: number;
    session_count: number;
    spell_count: number;
    timestamp_count: number;
}