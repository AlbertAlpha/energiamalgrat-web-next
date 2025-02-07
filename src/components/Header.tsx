import Image from 'next/image';
import Link from 'next/link';

import { NavigationItems } from './navigation-items';
import { NavigationMobile } from './navigation-mobile';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" title="Comunitat Energètica Malgrat" className="flex items-center">
          <Image src="/icon.svg" width={512} height={512} alt="logo" className="h-8 w-auto" />
          <span className="ml-2 hidden text-lg font-bold sm:inline">Comunitat Energètica Malgrat</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <NavigationItems />
          </ul>
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
        <NavigationMobile />
      </div>
    </header>
  );
};

export default Header;
