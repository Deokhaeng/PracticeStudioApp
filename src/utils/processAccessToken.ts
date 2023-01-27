import { TokenResponse } from 'api/Auth';
import Token from 'token';

export default function processAccessToken({ accessToken, refreshToken }: Partial<TokenResponse>) {
  if (accessToken && refreshToken) {
    Token.setAccessToken(accessToken);
    Token.setRefreshToken(refreshToken);
    return true;
  }
  return false;
}
