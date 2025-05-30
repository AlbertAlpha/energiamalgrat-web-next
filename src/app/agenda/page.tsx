import { ActivityCard } from "~/components/activities/ActivityCard";
import { Card, CardContent } from "~/components/ui/card";
import { getAllActivities, getAllCategories } from "~/lib/wordpress";

const AgendaPage = async () => {
  const [activities, categories] = await Promise.all([getAllActivities(), getAllCategories()]);

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.acf.start_datetime).getTime() - new Date(b.acf.start_datetime).getTime(),
  );

  return (
    <main className="container mx-auto max-w-5xl flex-grow px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Agenda d&apos;Activitats</h1>
      <div className="space-y-6">
        {sortedActivities.length === 0 ? (
          <Card>
            <CardContent className="text-muted-foreground py-8 text-center">
              No hi ha activitats programades actualment.
            </CardContent>
          </Card>
        ) : (
          sortedActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} categories={categories} />
          ))
        )}
      </div>
    </main>
  );
};

export default AgendaPage;
