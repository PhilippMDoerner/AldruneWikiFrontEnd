export interface Organization{
    "creation_datetime": string,
    "update_datetime": string,
    "name": string,
    "leader": organizationCharacter,
    "description":string,
    "headquarter": organizationLocation,
    "members": organizationCharacter[],
    'pk': number
}

interface organizationLocation{
    "name": string,
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

export interface SimpleOrganization{
    "name": string,
    "leader": string,
    "description":string,
    "headquarter": number,
}