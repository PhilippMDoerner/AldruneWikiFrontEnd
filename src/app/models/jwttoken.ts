export interface EncodedJWTToken{
    access: string,
    refresh: string,
}

export interface DecodedTokenPayload{
    exp: number,
    jti: string,
    token_type: string,
    user_id: number,
    user_name: string,
    permissions: string[],
    isAdmin: boolean,
    isSuperUser: boolean,
    campaign_memberships: any //This is a dictionary like object, using campaign names as keys and roles (e.g. "member", "admin") as values
}