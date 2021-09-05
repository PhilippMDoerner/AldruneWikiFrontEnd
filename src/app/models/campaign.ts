import { ArticleObject } from './base-models';
import { Image } from './image';
import { Constants } from '../app.constants';
import { User } from './user';

export interface Campaign{
    name: string;
    pk?: number;
    background_image?: string;

    members?: User[];
    admins?: User[];
    guests?: User[];

    member_group_name?: string;
    admin_group_name?: string;
    guest_group_name?: string;
}

export interface CampaignOverview extends ArticleObject{
    name: string;
    pk?: number;
    background_image?: string;

    isMember: boolean;
    isAdmin: boolean;
    isGuest: boolean;
}

export class CampaignObject implements Campaign{
    pk?: number;
    name: string;

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