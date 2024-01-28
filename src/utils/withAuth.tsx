"use client";

import { useAuthenticator } from "@aws-amplify/ui-react-core";
import * as Auth from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: any) => {
  const WrapperComponent = (props: any) => {
    const [authenticatedUser, setAuthenticateduser] =
      useState<Auth.AuthUser | null>(null);
    const router = useRouter();
    const { user } = useAuthenticator((context) => [context.user]);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const user = await Auth.getCurrentUser();

          setAuthenticateduser(user);
        } catch (err) {
          router.push("/auth/login");
        }
      };

      checkAuth();
    }, [router, user]);

    return authenticatedUser && <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default withAuth;
