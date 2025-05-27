interface Project {
  name: string;
  location: string;
  status: string;
  technicalDetails: string;
  description: string;
}

export default function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">{project.name}</h2>
      <p>
        <strong>Ubicació:</strong> {project.location}
      </p>
      <p>
        <strong>Estat:</strong> {project.status}
      </p>
      <p>
        <strong>Detalls tècnics:</strong> {project.technicalDetails}
      </p>
      <p>
        <strong>Descripció:</strong> {project.description}
      </p>
    </div>
  );
}
