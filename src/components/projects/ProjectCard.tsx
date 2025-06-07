import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { ExternalLinkIcon, MapPinIcon } from "lucide-react";

import { Card, CardContent } from "~/components/ui/card";
import type { WP_REST_API_Project } from "~/lib/wordpress";

type ProjectCardProps = {
  project: WP_REST_API_Project;
  featuredMedia: { source_url: string; alt_text: string } | null;
};

export const ProjectCard = ({ project, featuredMedia }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden p-0">
      {featuredMedia && (
        <div className="relative h-64 w-full">
          <Image
            src={featuredMedia.source_url}
            alt={featuredMedia.alt_text || ""}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            priority
          />
        </div>
      )}
      <CardContent className="px-6 pt-2 pb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">{parse(project.title.rendered)}</h2>
            {project.acf.geo && (
              <div className="mb-4 flex items-center">
                <MapPinIcon className="mr-2 flex-shrink-0" />
                <div className="flex flex-col">
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.acf.geo.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center font-medium hover:underline"
                  >
                    Veure al mapa
                    <ExternalLinkIcon className="ml-1 h-3 w-3" />
                  </Link>
                  <span className="text-muted-foreground text-sm">{project.acf.geo.address}</span>
                </div>
              </div>
            )}
          </div>
          <div className="wordpress-content prose prose-sm dark:prose-invert max-w-none text-justify">
            {project.content?.rendered && parse(project.content.rendered)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
