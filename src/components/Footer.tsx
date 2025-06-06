import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pb-4">
      <hr className="mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="text-muted-foreground container mx-auto px-4 text-center text-sm italic">
        {`© ${new Date().getFullYear()} Copyright - `}
        <Link href="https://www.energiamalgrat.cat" className="hover:text-primary hover:underline">
          Comunitat Energètica Malgrat
        </Link>
      </div>
      <div className="text-muted-foreground mx-auto mt-2 flex h-[30px] items-center justify-center gap-2 px-4 text-sm">
        <Link
          href="https://www.cdmon.com"
          title="Hosted by cdmon"
          rel="follow"
          className="hover:text-primary ml-3 flex h-full items-center hover:underline"
          target="_blank"
        >
          Hosted by
          <Image
            src="/assets/logo-cdmon.svg"
            alt="cdmon logo"
            width={199}
            height={44}
            className="ml-3 h-auto max-h-[30px] w-auto pb-1 dark:hidden"
          />
          <Image
            src="/assets/logo-cdmon-dark.svg"
            alt="cdmon logo"
            width={199}
            height={44}
            className="ml-3 hidden h-auto max-h-[30px] w-auto pb-1 dark:block"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
