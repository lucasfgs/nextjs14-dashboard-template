import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { CookieStorage } from "aws-amplify/utils";

let isConfigured = false;

function requireCognitoConfig() {
  const userPoolId = process.env.COGNITO_POOL_ID;
  const userPoolClientId = process.env.COGNITO_APP_CLIENT_ID;

  if (!userPoolId || !userPoolClientId) {
    throw new Error(
      "Missing Cognito environment variables. Set COGNITO_POOL_ID and COGNITO_APP_CLIENT_ID before using auth features."
    );
  }

  return { userPoolId, userPoolClientId };
}

export function configureAmplifyAuth() {
  if (isConfigured) {
    return;
  }

  const { userPoolId, userPoolClientId } = requireCognitoConfig();

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
  isConfigured = true;
}
