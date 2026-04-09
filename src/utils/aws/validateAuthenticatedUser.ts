import { cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { JwtExpiredError } from "aws-jwt-verify/error";

let verifier:
  | ReturnType<typeof CognitoJwtVerifier.create>
  | null = null;

function getCognitoConfig() {
  const userPoolId = process.env.COGNITO_POOL_ID;
  const clientId = process.env.COGNITO_APP_CLIENT_ID;

  if (!userPoolId || !clientId) {
    return null;
  }

  return { userPoolId, clientId };
}

function getVerifier() {
  if (verifier) {
    return verifier;
  }

  const config = getCognitoConfig();

  if (!config) {
    return null;
  }

  verifier = CognitoJwtVerifier.create({
    userPoolId: config.userPoolId,
    tokenUse: "access",
    clientId: config.clientId,
  });

  return verifier;
}

function getTokenFromCookies(clientId: string): string | null {
  const cookieStore = cookies();
  const cookieNames = [
    `CognitoIdentityServiceProvider.${clientId}.accessToken`,
    `CognitoIdentityServiceProvider.${clientId}.LastAuthUser`,
  ];

  for (const cookieName of cookieNames) {
    const token = cookieStore.get(cookieName)?.value;

    if (token) {
      return token;
    }
  }

  return null;
}

export async function validateAuthenticatedUser() {
  const config = getCognitoConfig();

  if (!config) {
    return null;
  }

  const token = getTokenFromCookies(config.clientId);

  if (!token) {
    return null;
  }

  const jwtVerifier = getVerifier();

  if (!jwtVerifier) {
    return null;
  }

  try {
    return await jwtVerifier.verify(token);
  } catch (error) {
    if (error instanceof JwtExpiredError) {
      return "ACCESS_TOKEN_EXPIRED";
    }
    return null;
  }
}
