import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: String(process.env.AWS_COGNITO_POOL_ID),
      userPoolClientId: String(process.env.AWS_COGNITO_APP_CLIENT_ID),
      loginWith: {
        email: true,
        username: false,
        phone: true,
      },
    },
  },
});
