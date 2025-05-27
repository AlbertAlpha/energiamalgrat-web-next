"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import ProjectDetails from "./ProjectDetails";

const projects = [
  {
    id: "1",
    name: "Pista Polivalent",
    location: "41.648187296819245, 2.747714896353087",
    status: "En progrés",
    technicalDetails: "Panells solars de 300W, capacitat total de 50kW",
    description:
      "Projecte d'energia solar compartida a la Pista Polivalent, proporcionant energia neta a la comunitat local.",
  },
  {
    id: "2",
    name: "Caserna de Policia",
    location: "41.6487512192278, 2.7352173742646646",
    status: "Planificat",
    technicalDetails: "Panells solars de 350W, capacitat total de 75kW",
    description:
      "Iniciativa d'energia solar a la Caserna de Policia, contribuint a la sostenibilitat energètica de la zona.",
  },
];

export default function ProjectTabs() {
  return (
    <Tabs defaultValue={projects[0]?.id} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {projects.map((project) => (
          <TabsTrigger key={project.id} value={project.id}>
            {project.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {projects.map((project) => (
        <TabsContent key={project.id} value={project.id}>
          <div className="rounded-b-lg bg-white p-6 shadow-md">
            <ProjectDetails project={project} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
