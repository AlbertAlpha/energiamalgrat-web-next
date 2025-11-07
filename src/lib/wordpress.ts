import { GraphQLClient } from "graphql-request";
import { env } from "~/env";
import {
  type GetActivitiesQuery,
  type GetProjectsEnergyQuery,
  getSdk,
} from "~/server/graphql/generated/client";

export type WP_Activity = GetActivitiesQuery["activities"]["nodes"][0];
export type WP_ProjectEnergy =
  GetProjectsEnergyQuery["projectsEnergy"]["nodes"][0];

const client = new GraphQLClient(`${env.WORDPRESS_URL}/graphql`, {
  headers: {
    Authorization: `Basic ${Buffer.from(`${env.WP_USER}:${env.WP_APP_PASS}`).toString("base64")}`,
  },
});
const wpGraphQLClient = getSdk(client);

export const wpGraphQL = {
  async getActivities() {
    const data = await wpGraphQLClient.getActivities();
    return data?.activities.nodes ?? [];
  },
  async getProjectsEnergy() {
    const data = await wpGraphQLClient.getProjectsEnergy();
    return (
      data?.projectsEnergy.nodes.sort(
        (a, b) => a.projectEnergyDetails.order - b.projectEnergyDetails.order,
      ) ?? []
    );
  },
};

export function getUpcomingAndPastActivities(activities: WP_Activity[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day

  const { upcoming, past } = activities.reduce(
    (acc, activity) => {
      const startDate = new Date(activity.activityDetails.startDatetime);
      const activityDate = new Date(startDate);
      activityDate.setHours(0, 0, 0, 0); // Set to start of day

      if (activityDate >= today) {
        acc.upcoming.push(activity);
      } else {
        acc.past.push(activity);
      }
      return acc;
    },
    { upcoming: [], past: [] } as {
      upcoming: WP_Activity[];
      past: WP_Activity[];
    },
  );

  // Sort upcoming activities by date (ascending)
  const sortedUpcoming = [...upcoming].sort(
    (a, b) =>
      new Date(a.activityDetails.startDatetime).getTime() -
      new Date(b.activityDetails.startDatetime).getTime(),
  );

  // Sort past activities by date (descending)
  const sortedPast = [...past].sort(
    (a, b) =>
      new Date(b.activityDetails.startDatetime).getTime() -
      new Date(a.activityDetails.startDatetime).getTime(),
  );

  return {
    upcoming: sortedUpcoming,
    past: sortedPast,
  };
}
