export interface Image{
    "image": string,
    "name": string,
    "character_article": number,
    "location_article": number,
    "creature_article": number,
    "organization_article": number,
    "encounter_article": number,
    "item_article": number
    "pk": number 
}

export class EmptyImage implements Image{
    url = null
    image = null;
    name = null;
    character_article = null;
    location_article = null;
    creature_article = null;
    organization_article = null;
    encounter_article = null;
    item_article = null;
    pk = null;
}