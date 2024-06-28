'use client';

import { Button } from '#/components/ui/button';
import { Workflow, workflowSchema } from '#/lib/schemas/workflow';
import { PlayIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { z } from 'zod';

let didInit = false;
function Page() {
  const [workflows, setWorkflows] = React.useState<Workflow[]>([]);
  const [isFetching, setIsFetching] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/workflows')
      .then((res) => res.json())
      .then((data) => z.array(workflowSchema).parse(data))
      .then(setWorkflows)
      .finally(() => setIsFetching(false));
  }, []);

  if (isFetching) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="w-full mx-auto max-w-screen-sm flex flex-col gap-3">
        <h1 className="font-semibold text-2xl">Workflows</h1>
        {workflows.map((workflow) => (
          <div key={workflow.id} className="flex px-3 gap-3 bg-background shadow-sm items-center rounded h-16">
            <div className="flex flex-1 flex-col">
              <h3>{workflow.name}</h3>
              <p className="text-muted-foreground line-clamp-1 text-sm">{workflow.description}</p>
            </div>

            <Button variant="outline" size="icon" asChild>
              <Link href={`/workflows/${workflow.id}`}>
                <PlayIcon size={20} />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
