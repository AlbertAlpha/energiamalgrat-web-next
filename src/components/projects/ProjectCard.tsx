import parse from "html-react-parser";
import { ExternalLinkIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "~/components/ui/card";
import type { WP_ProjectEnergy } from "~/lib/wordpress";

type ProjectCardProps = {
  project: WP_ProjectEnergy;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden p-0">
      {project.featuredImage && (
        <div className="relative h-64 w-full">
          <Image
            src={project.featuredImage.node.sourceUrl}
            alt={project.featuredImage.node.altText ?? ""}
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
            <h2 className="mb-4 font-bold text-2xl">{parse(project.title)}</h2>
            {project.projectEnergyDetails.geo && (
              <div className="mb-4 flex items-center">
                <MapPinIcon className="mr-2 shrink-0" />
                <div className="flex flex-col">
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.projectEnergyDetails.geo.streetAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium text-primary hover:underline"
                  >
                    Veure al mapa
                    <ExternalLinkIcon className="ml-1 h-3 w-3" />
                  </Link>
                  <span className="text-muted-foreground text-sm">
                    {project.projectEnergyDetails.geo.streetAddress}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="wordpress-content prose prose-sm dark:prose-invert max-w-none text-justify">
            {project.content && parse(project.content)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
