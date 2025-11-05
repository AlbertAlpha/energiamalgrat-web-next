import { ProjectCard } from "~/components/projects/ProjectCard";
import { getAllProjects, getFeaturedMediaById } from "~/lib/wordpress";

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const projectsWithMedia = await Promise.all(
    projects.map(async (project) => {
      const featuredMedia = project.featured_media
        ? await getFeaturedMediaById(project.featured_media)
        : null;
      return { project, featuredMedia };
    }),
  );

  return (
    <main className="container mx-auto max-w-5xl grow px-4 py-8">
      <h1 className="mb-6 font-bold text-3xl">Els nostres projectes</h1>
      <div className="space-y-6">
        {projectsWithMedia.map(({ project, featuredMedia }) => (
          <ProjectCard
            key={project.id}
            project={project}
            featuredMedia={featuredMedia}
          />
        ))}
      </div>
    </main>
  );
}
