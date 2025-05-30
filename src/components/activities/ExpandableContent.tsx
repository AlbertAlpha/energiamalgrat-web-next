"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

interface ExpandableContentProps {
  children: React.ReactNode;
}

export const ExpandableContent = ({ children }: ExpandableContentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className={cn(
          "overflow-hidden transition-[height,opacity] duration-300",
          !isExpanded && "max-h-24 relative"
        )}
      >
        {children}
        {!isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>
      <div className="flex justify-end">
        <Button
          variant="link"
          size="sm"
          className="mt-2 p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Veure menys" : "Veure més"}
          <ChevronDownIcon
            className={cn("ml-1 h-4 w-4 transition-transform", isExpanded && "rotate-180")}
          />
        </Button>
      </div>
    </>
  );
