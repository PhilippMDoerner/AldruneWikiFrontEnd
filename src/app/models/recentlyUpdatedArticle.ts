import { ApiObject } from './base-models';
import { ArticleTypeToObjectClassMapping } from './overviewItem';

export interface Article extends ApiObject{
    name: string,
    name_full: string,
    description: string,
    article_type: string,
    update_date: string,
    pk?: number,
    image_url: string,
}

export class OverviewArticleObject{
    name: string;
    name_full: string;
    description: string;
    article_type: string;
    update_date: string;
    pk: number;
    image_url: string;

    constructor(object?: Article){
        if (object) Object.assign(this, object)
    }

    getAbsoluteRouterUrl(): string{
        const articleTypeLower: string = this.article_type.toLowerCase();
        const articleClass = ArticleTypeToObjectClassMapping[articleTypeLower];
        return new articleClass(this).getAbsoluteRouterUrl();
    }
}

