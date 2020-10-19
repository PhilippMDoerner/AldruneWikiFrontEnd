export interface Image{
    image_pk: number,
    url: string,
    name: string
}

export class EmptyImage implements Image{
    url = null
    image_pk = null;
    name = null;
}