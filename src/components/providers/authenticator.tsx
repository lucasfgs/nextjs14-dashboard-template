"use client";

import { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";

import { configureAmplifyAuth } from "@/utils/aws/Amplify";

interface AuthenticatorProviderProps {
  children: React.ReactNode;
}

export default function AuthenticatorProvider({
  children,
}: AuthenticatorProviderProps) {
  const [authEnabled, setAuthEnabled] = useState(false);

  useEffect(() => {
    try {
      configureAmplifyAuth();
      setAuthEnabled(true);
    } catch {
      setAuthEnabled(false);
    }
  }, []);

  if (!authEnabled) {
    return <>{children}</>;
  }

  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
