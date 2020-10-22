export interface Item    {
    "creation_datetime": string,
    "update_datetime": string,
    "name": string,
    "description": string,
    "owner": itemCharacter
    "pk": number
}

interface itemCharacter{
    "name": string,
    "pk": number
}

export interface SimpleItem{
    "name": string,
    "description": string,
    "owner": number,
    "pk": number
}