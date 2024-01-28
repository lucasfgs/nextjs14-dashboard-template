"use client";

import { Button } from "@/components/ui/button";
import withAuth from "@/utils/withAuth";
import * as Auth from "aws-amplify/auth";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Button onClick={() => Auth.signOut()}>Sign out</Button>
    </div>
  );
};

export default withAuth(Dashboard);
