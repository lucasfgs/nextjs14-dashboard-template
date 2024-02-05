import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { CookieStorage } from "aws-amplify/utils";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: String(process.env.COGNITO_POOL_ID),
      userPoolClientId: String(process.env.COGNITO_APP_CLIENT_ID),
      loginWith: {
        email: true,
        username: false,
        phone: true,
      },
    },
  },
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage({}));
