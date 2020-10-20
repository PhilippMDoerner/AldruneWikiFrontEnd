export interface Organization{
    "url": string,
    "creation_datetime": string,
    "update_datetime": string,
    "name": string,
    "leader": string,
    "description":string,
    "is_secret": boolean,
    "headquarter": string
}

export interface OrganizationListEntry {
    "pk": number,
    "name": string
}