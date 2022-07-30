import { CampaignRole } from "../app.constants"

export interface EncodedJWTToken{
    access: string,
    refresh: string,
}

export enum TokenType{
    ACCESS = "access",
    REFRESH = "refresh"
}

export interface UserData{
    accessToken: TokenData,
    refreshToken: TokenData,
    userId: number,
    userName: string,
    isAdmin: boolean,
    isSuperUser: boolean,
    campaignMemberships: CampaignMemberships //This is a dictionary like object, using campaign names as keys and roles (e.g. "member", "admin") as values
}

export interface TokenData{
    token: string
    exp: number
    type: TokenType
}

export interface CampaignMemberships{
    [key: string]: CampaignRole
}