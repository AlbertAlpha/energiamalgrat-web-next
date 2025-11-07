"use client";

import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ExpandableContentProps {
  children: React.ReactNode;
}

export const ExpandableContent = ({ children }: ExpandableContentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);

      const resizeObserver = new ResizeObserver((entries) => {
        const [entry] = entries;
        if (entry) {
          setContentHeight(entry.target.scrollHeight);
        }
      });

      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <>
      <div className="relative">
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: isExpanded ? `${contentHeight}px` : "6rem" }}
        >
          {children}
        </div>
        {!isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-background to-transparent" />
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
            className={cn(
              "ml-1 h-4 w-4 transition-transform",
              isExpanded && "rotate-180",
            )}
          />
        </Button>
      </div>
    </>
  );
};
