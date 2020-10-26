export interface Image{
    pk: number,
    image: string,
    name: string,
    character_article: number,
    creature_article: number,
    encounter_article: number,
    item_article: number,
    location_article: number,
    organization_article: number,
    article_type: string,
    imageFile?: File
}
// TODO: Finish the file upload tutorial in chrome
export class EmptyImage implements Image{
    pk: number = null;
    image: string = "";
    name: string = "";
    character_article: number = null;
    creature_article: number = null;
    encounter_article: number = null;
    item_article: number = null;
    location_article: number = null;
    organization_article: number = null;
    article_type: string = "";
    imageFile: File = null;
}