import Link from "next/link";
import parse from "html-react-parser";
import { CalendarIcon, ClockIcon, ExternalLinkIcon, MapPinIcon } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { formatDate, formatDuration } from "~/lib/utils";
import { getAllCategories, getAllPosts } from "~/lib/wordpress";

const AgendaPage = async () => {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()]);

  return (
    <main className="container mx-auto max-w-5xl flex-grow px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Agenda d&apos;Activitats</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title.rendered}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 flex-shrink-0" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="mr-2 flex-shrink-0" />
                  <span>{formatDuration(120)}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                {categories
                  .filter((cat) => post.categories?.includes(cat.id) ?? false)
                  .map((category) => (
                    <Badge key={category.id} className="mr-2">
                      {category.name}
                    </Badge>
                  ))}
              </div>
              <div className="mt-2 flex items-center">
                <MapPinIcon className="mr-2 flex-shrink-0" />
                <span>{"mininininininiii"}</span>
              </div>
              <div className="mb-4">{parse(post.content.rendered, { trim: true })}</div>
            </CardContent>
            <CardFooter className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("mininininininiii")}`}
                  target="_blank"
                >
                  Veure al mapa
                  <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <span className="text-muted-foreground text-sm">Creat el {post.modified}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default AgendaPage;
