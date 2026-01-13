"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItemsProps {
  onItemClick?: () => void;
}

export const NavigationItems = ({ onItemClick }: NavigationItemsProps) => {
  const pathname = usePathname();

  return (
    <>
      <li>
        <Link
          href="/"
          className={`transition-colors hover:text-primary ${pathname === "/" ? "border-primary border-b-2 font-semibold text-primary" : ""}`}
          onNavigate={onItemClick}
        >
          Inici
        </Link>
      </li>
      <li>
        <Link
          href="/projects"
          className={`transition-colors hover:text-primary ${pathname === "/projects" ? "border-primary border-b-2 font-semibold text-primary" : ""}`}
          onNavigate={onItemClick}
        >
          Projectes
        </Link>
      </li>
      <li>
        <Link
          href="/agenda"
          className={`transition-colors hover:text-primary ${pathname === "/agenda" ? "border-primary border-b-2 font-semibold text-primary" : ""}`}
          onNavigate={onItemClick}
        >
          Agenda
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={`transition-colors hover:text-primary ${pathname === "/contact" ? "border-primary border-b-2 font-semibold text-primary" : ""}`}
          onNavigate={onItemClick}
        >
          Contacte
        </Link>
      </li>
    </>
  );
};
