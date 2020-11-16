import { ApiObject } from './base-models';

export interface Article extends ApiObject{
    name: string,
    name_full: string,
    url: string,
    description: string,
    article_type: string,
    update_date: string,
}

