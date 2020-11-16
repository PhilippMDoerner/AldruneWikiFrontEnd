export interface ApiObject{
    getAbsoluteRouterUrl(): string,
    pk?: number,
}

export interface ArticleObject extends ApiObject{
    name: string,
    creation_datetime?: string,
    update_datetime?: string,
}