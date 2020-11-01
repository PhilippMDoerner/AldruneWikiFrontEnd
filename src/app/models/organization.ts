import { Image } from './image';

export interface Organization{
    "creation_datetime"?: string,
    "update_datetime"?: string,
    "name": string,
    "leader": string,
    "description":string,
    "headquarter": number,
    "headquarter_details"?: organizationLocation
    "members"?: organizationCharacter[],
    'pk'?: number,
    "images"?: Image[],
}

interface organizationLocation{
    "name": string,
    "name_full": string,
    "pk": number
}

interface organizationCharacter{
    "name": string,
    "pk": number
}
export interface OrganizationListEntry {
    "pk": number,
    "name": string
}

export class EmptyFormOrganization{
    "name": string = null;
    "leader": string = null;
    "description":string = null;
    "headquarter": number = null;
}