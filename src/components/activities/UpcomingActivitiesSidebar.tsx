import Link from "next/link";
import { format } from "date-fns";
import { ca } from "date-fns/locale";
import parse from "html-react-parser";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { WP_REST_API_Activity } from "~/lib/wordpress";

interface UpcomingActivitiesSidebarProps {
  activities: WP_REST_API_Activity[];
}

export const UpcomingActivitiesSidebar = ({ activities }: UpcomingActivitiesSidebarProps) => {
  const upcomingActivities = [...activities]
    .filter((activity) => new Date(activity.acf.start_datetime) >= new Date())
    .sort((a, b) => new Date(a.acf.start_datetime).getTime() - new Date(b.acf.start_datetime).getTime())
    .slice(0, 5);

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-lg">Properes Activitats</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {upcomingActivities.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center">No hi ha activitats programades actualment.</p>
        ) : (
          upcomingActivities.map((activity) => {
            const startDate = new Date(activity.acf.start_datetime);
            return (
              <div key={activity.id} className="grid gap-1">
                <Link href={`/agenda#activity-${activity.id}`} className="text-primary font-medium hover:underline">
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
