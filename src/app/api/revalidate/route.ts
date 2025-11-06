import type { Route } from "next";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

export const maxDuration = 30;

/**
 * WordPress Content Revalidation Tracker webhook handler
 * Receives notifications from WordPress when content changes
 * and revalidates the corresponding Next.js routes
 * Returns the Next.js route path or null if no mapping exists
 */
function mapWordPressPathToNextRoute(wordPressPath: string): Route | null {
  if (wordPressPath.startsWith("/activity/")) {
    return "/agenda";
  } else if (wordPressPath.startsWith("/project-energy/")) {
    return "/projects";
  } else {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    // Content Revalidation Tracker plugin sends secret and path in the body
    const { secret, path } = requestBody;

    // Validate secret
    if (!secret || secret !== env.WORDPRESS_SECRET) {
      console.error("Invalid webhook secret");
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Validate path
    if (!path || typeof path !== "string") {
      return NextResponse.json(
        { message: "Missing or invalid path" },
        { status: 400 },
      );
    }

    try {
      // Map WordPress path to Next.js routes
      const routePath = mapWordPressPathToNextRoute(path);

      // If no mapping exists, return an error
      if (!routePath) {
        return NextResponse.json(
          {
            revalidated: false,
            message: `No mapping found for WordPress path: ${path}`,
            wordPressPath: path,
            timestamp: new Date().toISOString(),
          },
          { status: 400 },
        );
      }

      console.log(`Revalidating route for WordPress path: ${path}`);
      console.log(`Mapped to Next.js route: ${routePath}`);

      // Revalidate the specific route
      revalidatePath(routePath);

      return NextResponse.json({
        revalidated: true,
        message: `Revalidated route for WordPress path: ${path}`,
        wordPressPath: path,
        nextRoutePath: routePath,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error revalidating route:", error);
      return NextResponse.json(
        {
          revalidated: false,
          message: "Failed to revalidate route",
          error: (error as Error).message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        message: "Error revalidating content",
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
