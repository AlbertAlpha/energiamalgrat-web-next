import Image from "next/image";

import Hero from "~/components/Hero";
import Social from "~/components/Social";

export default function HomePage() {
  return (
    <main className="container mx-auto flex-grow px-4 py-8">
      <Hero />
      <Social />
      <Image
        src="/assets/landing-page-mobile.svg"
        width={427}
        height={230}
        alt="hero-mobile"
        className="mx-auto mt-10 lg:hidden"
      />
      <Image
        src="/assets/landing-page-desktop.svg"
        width={1589}
        height={395}
        alt="hero-desktop"
        className="mx-auto hidden overflow-auto px-8 lg:order-2 lg:flex lg:size-full"
      />
    </main>
  );
}
