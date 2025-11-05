import Link from "next/link";
import { format } from "date-fns";
import { ca } from "date-fns/locale";
import parse from "html-react-parser";
import {
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  MapPinIcon,
} from "lucide-react";
import type { WP_REST_API_Category } from "wp-types";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { WP_REST_API_Activity } from "~/lib/wordpress";

import { ExpandableContent } from "./ExpandableContent";

interface ActivityCardProps {
  activity: WP_REST_API_Activity;
  categories: WP_REST_API_Category[];
}

export const ActivityCard = ({ activity, categories }: ActivityCardProps) => {
  const startDate = new Date(activity.acf.start_datetime);

  return (
    <Card className="gap-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          {parse(activity.title.rendered)}
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((cat) => activity.categories?.includes(cat.id) ?? false)
            .map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center">
              <CalendarIcon className="mr-2 flex-shrink-0" />
              <span>
                {format(startDate, "EEEE, d MMMM yyyy", { locale: ca })}
              </span>
            </div>
            <div className="mb-2 flex items-center">
              <ClockIcon className="mr-2 flex-shrink-0" />
              <span>{format(startDate, "H:mm", { locale: ca })}h</span>
            </div>
            <div className="mb-4 flex items-center">
              <MapPinIcon className="mr-2 flex-shrink-0" />
              <div className="flex flex-col">
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.acf.geo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-medium text-primary hover:underline"
                >
                  {activity.acf.place}
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </Link>
                <span className="text-muted-foreground text-sm">
                  {activity.acf.address}
                </span>
              </div>
            </div>
          </div>
          <div className="wordpress-content prose prose-sm dark:prose-invert max-w-none text-justify">
            {activity.content?.rendered && (
              <ExpandableContent>
                {parse(activity.content.rendered)}
              </ExpandableContent>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <span className="text-muted-foreground text-sm">
          Publicat el{" "}
          {format(new Date(activity.date), "dd/MM/yyyy", { locale: ca })}
        </span>
      </CardFooter>
    </Card>
  );
};
