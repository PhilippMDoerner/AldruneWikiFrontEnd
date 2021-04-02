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
    isAdmin: boolean
}