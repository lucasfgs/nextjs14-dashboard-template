import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { CookieStorage } from "aws-amplify/utils";

const userPoolId = process.env.COGNITO_POOL_ID;
const userPoolClientId = process.env.COGNITO_APP_CLIENT_ID;

if (!userPoolId || !userPoolClientId) {
  throw new Error("Missing Cognito environment variables.");
}

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
      loginWith: {
        email: true,
        username: false,
        phone: true,
      },
    },
  },
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage({}));
