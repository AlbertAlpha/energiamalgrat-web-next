import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="z-50 flex w-full flex-wrap py-4 md:flex-nowrap md:justify-start">
      <nav className="relative mx-auto flex w-full max-w-7xl basis-full flex-wrap items-center px-4 md:grid md:grid-cols-12 md:px-6">
        <div className="md:col-span-3">
          <Link href="/" title="Comunitat Energètica Malgrat">
            <Image src="/icon.svg" width={512} height={512} alt="logo" className="h-8 w-auto" />
          </Link>
        </div>

        <div className="ms-auto flex items-center gap-x-1 py-1 md:order-3 md:col-span-3 md:gap-x-2 md:ps-6">
          <button
            type="button"
            className="inline-flex items-center gap-x-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-black hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-white/10 dark:hover:text-white dark:focus:text-white"
          >
            Sign in
          </button>

          <div className="md:hidden">
            <button
              type="button"
              className="hs-collapse-toggle flex size-[38px] items-center justify-center rounded-xl border border-gray-200 text-sm font-semibold text-black hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              id="hs-navbar-hcail-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-hcail"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-hcail"
            >
              ==
            </button>
          </div>
        </div>

        <div
          id="hs-navbar-hcail"
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:order-2 md:col-span-6 md:block md:w-auto md:basis-auto"
          aria-labelledby="hs-navbar-hcail-collapse"
        >
          <div className="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-center md:gap-x-7 md:gap-y-0">
            <div>
              <Link
                className="relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:h-1 before:w-full before:bg-lime-400 focus:outline-none dark:text-white"
                href="/"
                aria-current="page"
              >
                Inici
              </Link>
            </div>
            <div>
              <Link
                className="inline-block text-black hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                href="/projects"
              >
                Projectes
              </Link>
            </div>
            <div>
              <Link
                className="inline-block text-black hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                href="/about"
              >
                Qui som?
              </Link>
            </div>
            <div>
              <Link
                className="inline-block text-black hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                href="/contact"
              >
                Contacte
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
