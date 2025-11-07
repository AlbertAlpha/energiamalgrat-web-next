import { ProjectCard } from "~/components/projects/ProjectCard";
import { wpGraphQL } from "~/lib/wordpress";

export default async function ProjectsPage() {
  const projects = await wpGraphQL.getProjectsEnergy();

  return (
    <main className="container mx-auto max-w-5xl grow px-4 py-8">
      <h1 className="mb-6 font-bold text-3xl">Els nostres projectes</h1>
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
