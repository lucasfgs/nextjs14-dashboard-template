"use client";

import { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";

import { configureAmplifyAuth } from "@/utils/aws/Amplify";

interface AuthenticatorProviderProps {
  children: React.ReactNode;
}

export default function AuthenticatorProvider({
  children,
}: AuthenticatorProviderProps) {
  useEffect(() => {
    configureAmplifyAuth();
  }, []);

  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
