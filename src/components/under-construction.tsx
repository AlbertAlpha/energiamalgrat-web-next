import Image from "next/image";
import Link from "next/link";

type UnderConstructionPageProps = {
  title: string;
};

const UnderConstructionPage = ({ title }: UnderConstructionPageProps) => (
  <main className="container mx-auto flex-grow px-4 py-8">
    <div className="mx-auto max-w-2xl pt-6">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-6 text-lg">Pàgina en construcció, disculpi les molèsties.</p>
        <Image src="/assets/building-blocks.svg" width={500} height={500} alt="404" />
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className="text-sm font-semibold hover:underline">
            <span aria-hidden="true">←</span> Tornar al inici
          </Link>
        </div>
      </div>
    </div>
  </main>
);

export default UnderConstructionPage;
