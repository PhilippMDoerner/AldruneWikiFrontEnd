export interface ApiObject{
    getAbsoluteRouterUrl: () => string;
    pk?: number;
}
//TODO: Make it so that ApiObjects are created through an ArticleFactory that allows generating the URL instead of hard-coding it.
//Currently I am not doing this, as this would mean writing the factory, then injecting the factory into every service and replacing decorators
//with calls on the transform function which then would need to be moved into the generic services and uses the article factory to create the objects.
//Which seems like a lot of work for little gain

export interface ArticleObject extends ApiObject{
    name?: string,
    creation_datetime?: string,
    update_datetime?: string,
    description?: string,
    campaign?: number,
    campaign_details?: {pk: number, name: string}
}