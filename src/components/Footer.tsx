import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-center lg:text-left">
      <hr className="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="pb-4 text-center text-base italic text-neutral-500 dark:text-neutral-400">
        {`© ${new Date().getFullYear()} Copyright - `}
        <Link href="https://www.energiamalgrat.cat">Comunitat Energètica Malgrat</Link>
      </div>
    </footer>
  );
};

export default Footer;
