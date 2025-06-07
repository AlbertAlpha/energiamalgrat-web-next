import { ProjectCard } from "~/components/projects/ProjectCard";
import { getAllProjects } from "~/lib/wordpress";

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="container mx-auto max-w-5xl flex-grow px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Els nostres projectes</h1>
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
