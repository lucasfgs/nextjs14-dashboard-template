import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/pages/dashboard/main-nav";
import { Search } from "@/components/pages/dashboard/search";
import TeamSwitcher from "@/components/pages/dashboard/team-switcher";
import { UserNav } from "@/components/pages/dashboard/user-nav";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { validateAuthenticatedUser } from "@/utils/aws/validateAuthenticatedUser";
import HamburgerMenu from "@/components/pages/dashboard/hamburger-menu";
import Transition from "@/components/pages/dashboard/transition";

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
    <Transition>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher className="hidden md:flex" />
            <MainNav className="mx-6" />
            <div className="hidden ml-auto md:flex items-center space-x-4">
              <Search />
              <ThemeSwitcher />
              <UserNav />
            </div>
            <div className="flex md:hidden ml-auto">
              <HamburgerMenu />
            </div>
          </div>
        </div>
        {children}
      </div>
    </Transition>
  );
}
