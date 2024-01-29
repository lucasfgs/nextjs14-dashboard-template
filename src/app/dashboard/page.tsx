"use client";

import { Button } from "@/components/ui/button";
import withAuth from "@/utils/withAuth";
import * as Auth from "aws-amplify/auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function signOut() {
    setIsLoading(true);
    await Auth.signOut();
    router.push("/auth/login");
  }

  return (
    <div>
      <h1>Dashboard Page</h1>

      <Button onClick={() => signOut()} type="button" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign out
      </Button>
    </div>
  );
};

export default withAuth(Dashboard);
