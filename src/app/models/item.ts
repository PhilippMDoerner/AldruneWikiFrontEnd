import { Image } from './image';

export interface Item    {
    "creation_datetime": string,
    "update_datetime": string,
    "name": string,
    "description": string,
    "owner": number,
    "owner_details": itemCharacter,
    "images": Image[],
    "pk": number
}

interface itemCharacter{
    "name": string,
    "pk": number
}

export class EmptyFormItem{
    "name": string = null;
    "description": string = null;
    "owner": number = null;
    "pk": number = null;
}