"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationItems = () => {
  const pathname = usePathname();

  return (
    <>
      <li>
        <Link
          href="/"
          className={`hover:text-primary transition-colors ${pathname === "/" ? "border-primary text-primary border-b-2 font-semibold" : ""}`}
        >
          Inici
        </Link>
      </li>
      <li>
        <Link
          href="/projects"
          className={`hover:text-primary transition-colors ${pathname === "/projects" ? "border-primary text-primary border-b-2 font-semibold" : ""}`}
        >
          Projectes
        </Link>
      </li>
      <li>
        <Link
          href="/agenda"
          className={`hover:text-primary transition-colors ${pathname === "/agenda" ? "border-primary text-primary border-b-2 font-semibold" : ""}`}
        >
          Agenda
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={`hover:text-primary transition-colors ${pathname === "/contact" ? "border-primary text-primary border-b-2 font-semibold" : ""}`}
        >
          Contacte
        </Link>
      </li>
    </>
  );
};
