export interface Image{
    "url": string,
    "image": string,
    "name": string,
    "articleUrl": string
}

export class EmptyImage implements Image{
    url = "";
    image = "";
    name = "";
    articleUrl = "";
}