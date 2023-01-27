import Auth from './Auth';
import Video from './Video';
import Token from 'token';

const API = {
  Auth,
  Video,

  async hasToken(): Promise<boolean> {
    try {
      const token = Token.getAccessToken();
      return !!token;
    } catch (e) {
      return false;
    }
  },
};

export default API;
