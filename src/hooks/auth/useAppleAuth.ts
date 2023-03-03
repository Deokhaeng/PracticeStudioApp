import appleAuth from '@invertase/react-native-apple-authentication';

function useAppleAuth() {
  return async (): Promise<string | null> => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      if (credentialState === appleAuth.State.AUTHORIZED) {
        return appleAuthRequestResponse.identityToken;
      }

      console.log('로그인 요청은 성공했으나 인증이 실패함');
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
}

export default useAppleAuth;
