import { ArticleObject } from './base-models';
import { Image } from './image';

export interface Organization extends ArticleObject{
    leader: string,
    description: string,
    headquarter: number,
    headquarter_details?: {name: string, pk: number, name_full: string},
    members?: {name: string, pk: number}[],
    images?: Image[],
}


export class EmptyFormOrganization implements Organization{
    name: string = null;
    leader: string = null;
    description:string = null;
    headquarter: number = null;

    getAbsoluteRouterUrl(): string{
        return `/organization/${this.name}`;
    }
}