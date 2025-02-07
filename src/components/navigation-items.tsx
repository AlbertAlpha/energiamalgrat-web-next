'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavigationItems = () => {
  const pathname = usePathname();

  return (
    <>
      <li>
        <Link
          href="/"
          className={`transition-colors hover:text-primary ${pathname === '/' ? 'border-b-2 border-primary font-semibold text-primary' : ''}`}
        >
          Inici
        </Link>
      </li>
      <li>
        <Link
          href="/projects"
          className={`transition-colors hover:text-primary ${pathname === '/projects' ? 'border-b-2 border-primary font-semibold text-primary' : ''}`}
        >
          Projectes
        </Link>
      </li>
      <li>
        <Link
          href="/agenda"
          className={`transition-colors hover:text-primary ${pathname === '/agenda' ? 'border-b-2 border-primary font-semibold text-primary' : ''}`}
        >
          Agenda
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={`transition-colors hover:text-primary ${pathname === '/contact' ? 'border-b-2 border-primary font-semibold text-primary' : ''}`}
        >
          Contacte
        </Link>
      </li>
    </>
  );
};
