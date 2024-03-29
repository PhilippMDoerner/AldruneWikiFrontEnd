import { Constants } from '../app.constants';
import { ArticleObject } from './base-models';
import { Image } from './image';

export interface Organization extends ArticleObject{
    leader: string,
    description: string,
    headquarter: number,
    headquarter_details?: {name: string, parent_name: string, pk: number, name_full: string},
    members?: OrganizationMember[],
    images?: Image[],
}

export interface OrganizationMember{
    name: string;
    pk: number;
    alive: boolean;
    organization_id: number;
    role: string;
}

export class OrganizationObject implements Organization{
    name?: string;
    leader: string;
    description:string;
    headquarter: number;
    headquarter_details?: {name: string, parent_name: string, pk: number, name_full: string};
    pk?: number;
    images?: Image[];
    campaign_details?: {pk: number, name: string}
    campaign: number;

    constructor(object?: Organization){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/organization/${this.campaign_details.name}/${this.name}`;
        // return this.routingService.getRoutePath("organization", {campaign: this.campaign_details.name, name: this.name});
    }
}