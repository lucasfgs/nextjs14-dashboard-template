"use client";

import { Authenticator } from "@aws-amplify/ui-react";

import "@/utils/aws/Amplify";

interface AuthenticatorProviderProps {
  children: React.ReactNode;
}

export default function AuthenticatorProvider({
  children,
}: AuthenticatorProviderProps) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
