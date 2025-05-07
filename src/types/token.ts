export interface TokenPayload {
    jti: string;
    role: string;
    category: string;
    iat: number;
    exp: number;
}