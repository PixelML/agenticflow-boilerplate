import { Button } from '#/components/ui/button';
import { Skeleton } from '#/components/ui/skeleton';
import { CheckIcon, ClipboardIcon } from 'lucide-react';
import React from 'react';
import { z } from 'zod';

export const typeSchema = z.object({
  type: z.literal('string'),
});

export const resultSchema = z.string();

export const LoadingUI = () => {
  const Component = () => {
    return (
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  };

  return <Component />;
};

export const ResultUI = (data: z.infer<typeof resultSchema>) => {
  const Component = () => {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(data);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

    return (
      <div>
        <p>
          <Button className="float-right rounded-sm size-6" variant="outline" size="icon" onClick={handleCopy}>
            {isCopied ? <CheckIcon size={16} /> : <ClipboardIcon size={16} />}
          </Button>
          {data}
        </p>
      </div>
    );
  };

  return <Component />;
};

export const ErrorUI = () => {
  const Component = () => <div>Error</div>;
  return <Component />;
};
