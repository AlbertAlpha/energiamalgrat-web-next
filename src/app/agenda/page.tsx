import Link from 'next/link';
import { CalendarIcon, ClockIcon, ExternalLinkIcon, MapPinIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

interface Event {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  duration: number;
  location: string;
  createdAt: Date;
}

const events: Event[] = [
  {
    id: 1,
    title: "Taller d'Energia Solar",
    description: "Aprèn sobre l'energia solar i com pots implementar-la a casa teva.",
    startDate: new Date('2025-02-15T10:00:00'),
    duration: 120,
    location: 'Centre Cívic, Malgrat de Mar',
    createdAt: new Date('2025-01-20T09:00:00'),
  },
  {
    id: 2,
    title: 'Reunió Mensual de la Comunitat',
    description: 'Discutirem els avenços del projecte i planificarem les properes accions.',
    startDate: new Date('2025-02-20T18:30:00'),
    duration: 90,
    location: 'Sala de Plens, Ajuntament de Malgrat de Mar',
    createdAt: new Date('2025-01-25T14:00:00'),
  },
];

const AgendaPage = () => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ca-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <main className="container mx-auto max-w-5xl flex-grow px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Agenda d&apos;Activitats</h1>
      <div className="space-y-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{event.description}</p>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 flex-shrink-0" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="mr-2 flex-shrink-0" />
                  <span>{formatDuration(event.duration)}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <MapPinIcon className="mr-2 flex-shrink-0" />
                <span>{event.location}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                  target="_blank"
                >
                  Veure al mapa
                  <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground">Creat el {formatDate(event.createdAt)}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default AgendaPage;
