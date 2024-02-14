import { cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { JwtExpiredError } from "aws-jwt-verify/error";

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_POOL_ID as string,
  tokenUse: "access",
  clientId: process.env.COGNITO_APP_CLIENT_ID as string,
});

function getTokenFromCookies(): string | null {
  const cookieStore = cookies();

  const storedCookies = cookieStore.getAll();

  const token = storedCookies.find((cookie) => {
    if (
      !cookie.name.includes(
        `CognitoIdentityServiceProvider.${process.env.COGNITO_APP_CLIENT_ID}.`
      )
    ) {
      return null;
    }

    return cookie.name.includes("accessToken") ? cookie.value : null;
  });

  if (!token) {
    return null;
  }

  return token.value;
}

export async function validateAuthenticatedUser() {
  const token = await getTokenFromCookies();

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
