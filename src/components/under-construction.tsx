import Image from "next/image";
import Link from "next/link";

type UnderConstructionPageProps = {
  title: string;
};

const UnderConstructionPage = ({ title }: UnderConstructionPageProps) => (
  <main className="container mx-auto flex-grow px-4 py-8">
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-6 text-lg">Pàgina en construcció, disculpi les molèsties.</p>
        <Image
          src="/assets/building-blocks.svg"
          width={500}
          height={500}
          alt="404"
          className="h-auto max-h-[400px] w-auto"
        />
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Link href="/" className="text-sm font-semibold hover:underline">
            <span aria-hidden="true">←</span> Tornar al inici
          </Link>
        </div>
      </div>
    </div>
  </main>
);

export default UnderConstructionPage;
