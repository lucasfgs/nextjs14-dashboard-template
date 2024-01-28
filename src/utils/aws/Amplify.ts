import { Amplify } from "aws-amplify";

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
