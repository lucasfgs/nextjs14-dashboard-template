"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import useIsMobile from "@/utils/hooks/useIsMobile";

import { Search } from "./search";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import TeamSwitcher from "./team-switcher";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile]);

  return (
    <Drawer
      direction="top"
      shouldScaleBackground
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DrawerTrigger asChild>
        <Button variant={"ghost"} onClick={() => setIsOpen(true)}>
          <HamburgerMenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90%] top-0">
        <DrawerHeader className="flex justify-between">
          <Search className="mr-2" />
          <div className="flex space-x-2">
            <ThemeSwitcher />
            <UserNav />
          </div>
        </DrawerHeader>
        <MainNav className="flex flex-col items-center justify-center mt-4" />
        <DrawerFooter>
          <TeamSwitcher className="w-full" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
