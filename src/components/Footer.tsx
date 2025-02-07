import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-4">
      <hr className="mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="container mx-auto px-4 text-center text-sm italic text-muted-foreground">
        {`© ${new Date().getFullYear()} Copyright - `}
        <Link href="https://www.energiamalgrat.cat" className="hover:underline">
          Comunitat Energètica Malgrat
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
