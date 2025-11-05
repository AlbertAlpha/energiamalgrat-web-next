import Image from "next/image";

import { UpcomingActivitiesSidebar } from "~/components/activities/UpcomingActivitiesSidebar";
import Hero from "~/components/Hero";
import Social from "~/components/Social";
import { getAllActivities } from "~/lib/wordpress";

export default async function HomePage() {
  const activities = await getAllActivities();

  return (
    <main className="container relative mx-auto flex-grow px-4 pt-8 pb-2">
      <div className="relative z-10 lg:flex lg:gap-8">
        <div className="lg:flex-1">
          <Hero />
          <Social />
        </div>
        <div className="my-8 lg:mt-0 lg:w-80">
          <UpcomingActivitiesSidebar activities={activities} />
        </div>
      </div>
      <Image
        src="/assets/landing-page-mobile.svg"
        width={427}
        height={230}
        alt=""
        role="presentation"
        className="mx-auto lg:hidden"
      />
      <Image
        src="/assets/landing-page-desktop.svg"
        width={1589}
        height={395}
        alt=""
        role="presentation"
        className="mx-auto hidden overflow-auto px-8 lg:flex lg:size-full"
      />
    </main>
  );
}
