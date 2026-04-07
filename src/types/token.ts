export interface TokenPayload {
  jti: string;
  role: string;
  id: number | null;
  category: string;
  iat: number;
  exp: number;
}
