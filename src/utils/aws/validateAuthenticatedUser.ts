import { cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { JwtExpiredError } from "aws-jwt-verify/error";

const userPoolId = process.env.COGNITO_POOL_ID;
const clientId = process.env.COGNITO_APP_CLIENT_ID;

if (!userPoolId || !clientId) {
  throw new Error("Missing Cognito environment variables.");
}

const verifier = CognitoJwtVerifier.create({
  userPoolId,
  tokenUse: "access",
  clientId,
});

function getTokenFromCookies(): string | null {
  const tokenPrefix = `CognitoIdentityServiceProvider.${clientId}.`;
  const cookieStore = cookies();

  const token = cookieStore.getAll().find((cookie) => {
    return cookie.name.includes(tokenPrefix) && cookie.name.includes("accessToken");
  });

  return token?.value ?? null;
}

export async function validateAuthenticatedUser() {
  const token = getTokenFromCookies();

  if (!token) {
    return null;
  }

  try {
    return await verifier.verify(token);
  } catch (error) {
    if (error instanceof JwtExpiredError) {
      return "ACCESS_TOKEN_EXPIRED";
    }
    return null;
  }
}
