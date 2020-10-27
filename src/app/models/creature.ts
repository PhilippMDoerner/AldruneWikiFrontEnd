import { Image } from './image';

export interface Creature {
    "pk": number,
    "images": Image,
    "creation_datetime": string,
    "update_datetime": string,
    "name": string,
    "description": string,
}

export interface SimpleCreature{
    "url": string,
    "name": string,
    "description": string,
}

export class EmptyFormCreature {
    "pk" = null;
    "name" = null;
    "description" = null;
}