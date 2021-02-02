import { Constants } from '../app.constants';
import { ArticleObject } from './base-models';
import { Image } from './image';

export interface Organization extends ArticleObject{
    leader: string,
    description: string,
    headquarter: number,
    headquarter_details?: {name: string, parent_name: string, pk: number, name_full: string},
    members?: {name: string, pk: number}[],
    images?: Image[],
}

export class OrganizationObject implements Organization{
    name?: string;
    leader: string;
    description:string;
    headquarter: number;
    headquarter_details?: {name: string, parent_name: string, pk: number, name_full: string};
    pk?: number;
    images?: Image[];

    constructor(object?: Organization){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        return `${Constants.wikiUrlFrontendPrefix}/organization/${this.name}`;
    }
}