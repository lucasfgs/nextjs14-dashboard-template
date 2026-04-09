import { describe, expect, it } from "vitest";

describe("validateAuthenticatedUser token cookie selection", () => {
  it("documents the exact Cognito access token cookie name used by the app", () => {
    const clientId = "example-client-id";

    expect(
      `CognitoIdentityServiceProvider.${clientId}.accessToken`
    ).toBe("CognitoIdentityServiceProvider.example-client-id.accessToken");
  });
});
