import { cookies } from "next/headers";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_POOL_ID as string,
  tokenUse: "access",
  clientId: process.env.COGNITO_APP_CLIENT_ID as string,
});

async function verifyJWT(token: string) {
  try {
    const payload = await verifier.verify(token);

    return payload;
  } catch {
    return null;
  }
}

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

  return await verifyJWT(token);
}
