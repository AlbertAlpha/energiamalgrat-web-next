"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { NavigationItems } from "./navigation-items";

export const NavigationMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Obrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Comunitat Energètica Malgrat</SheetTitle>
          <SheetDescription>Menú de navegació</SheetDescription>
          <nav className="mt-4 flex flex-col space-y-4">
            <ul className="flex flex-col space-y-6">
              <NavigationItems />
            </ul>
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
