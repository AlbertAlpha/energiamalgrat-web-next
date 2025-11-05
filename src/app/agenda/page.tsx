import { ActivityCard } from "~/components/activities/ActivityCard";
import { Card, CardContent } from "~/components/ui/card";
import {
  getAllActivities,
  getAllCategories,
  getUpcomingAndPastActivities,
} from "~/lib/wordpress";

const AgendaPage = async () => {
  const [activities, categories] = await Promise.all([
    getAllActivities(),
    getAllCategories(),
  ]);
  const { upcoming: sortedUpcoming, past: sortedPast } =
    getUpcomingAndPastActivities(activities);
  const noActivities = activities.length === 0;

  return (
    <main className="container mx-auto max-w-5xl flex-grow px-4 py-8">
      <h1 className="mb-6 font-bold text-3xl">Agenda d&apos;Activitats</h1>

      {noActivities ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No hi ha activitats programades actualment.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-12">
          <section>
            <h2 className="mb-6 font-semibold text-2xl">Properes Activitats</h2>
            <div className="space-y-6">
              {sortedUpcoming.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No hi ha activitats futures programades.
                  </CardContent>
                </Card>
              ) : (
                sortedUpcoming.map((activity) => (
                  <div key={activity.id} id={`activity-${activity.id}`}>
                    <ActivityCard activity={activity} categories={categories} />
                  </div>
                ))
              )}
            </div>
          </section>

          <section id="activitats-passades">
            <h2 className="mb-6 font-semibold text-2xl">Activitats Passades</h2>
            <div className="space-y-6">
              {sortedPast.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No hi ha activitats passades.
                  </CardContent>
                </Card>
              ) : (
                sortedPast.map((activity) => (
                  <div key={activity.id} id={`activity-${activity.id}`}>
                    <ActivityCard activity={activity} categories={categories} />
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default AgendaPage;
