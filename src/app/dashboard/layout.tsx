import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/pages/dashboard/main-nav";
import { Search } from "@/components/pages/dashboard/search";
import TeamSwitcher from "@/components/pages/dashboard/team-switcher";
import { UserNav } from "@/components/pages/dashboard/user-nav";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { validateAuthenticatedUser } from "@/utils/aws/validateAuthenticatedUser";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication page",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticatedUser = await validateAuthenticatedUser();

  if (!authenticatedUser) {
    redirect("/auth/login");
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ThemeSwitcher />
              <UserNav />
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
