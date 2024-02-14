"use client";

import { ReactNode } from "react";

import Transition from "@/components/pages/auth/_transition";

export default function Template({ children }: { children: ReactNode }) {
  return <Transition>{children}</Transition>;
}
