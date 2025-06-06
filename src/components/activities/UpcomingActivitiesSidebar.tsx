import Link from "next/link";
import { format } from "date-fns";
import { ca } from "date-fns/locale";
import parse from "html-react-parser";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { WP_REST_API_Activity } from "~/lib/wordpress";
import { getUpcomingAndPastActivities } from "~/lib/wordpress";

interface UpcomingActivitiesSidebarProps {
  activities: WP_REST_API_Activity[];
}

export const UpcomingActivitiesSidebar = ({ activities }: UpcomingActivitiesSidebarProps) => {
  const { upcoming } = getUpcomingAndPastActivities(activities);
  const upcomingActivities = upcoming.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Properes Activitats</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {upcomingActivities.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-muted-foreground mb-4">No hi ha activitats programades actualment.</p>
            <Link
              href="/agenda#activitats-passades"
              className="text-muted-foreground hover:text-primary text-sm hover:underline"
            >
              Veure activitats passades →
            </Link>
          </div>
        ) : (
          upcomingActivities.map((activity) => {
            const startDate = new Date(activity.acf.start_datetime);
            return (
              <div key={activity.id} className="grid gap-1">
                <Link
                  href={`/agenda#activity-${activity.id}`}
                  className="hover:text-primary font-medium hover:underline"
                >
                  {parse(activity.title.rendered)}
                </Link>
                <div className="text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{format(startDate, "d MMMM yyyy", { locale: ca })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{format(startDate, "H:mm", { locale: ca })}h</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
