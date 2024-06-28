import { Skeleton } from '#/components/ui/skeleton';
import { z } from 'zod';

export const typeSchema = z.any();

export const resultSchema = z.any();

export const LoadingUI = () => {
  const Component = () => {
    return (
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  };
  return <Component />;
};

export const ResultUI = (data: z.infer<typeof resultSchema>) => {
  const Component = () => {
    return <div>{JSON.stringify(data)}</div>;
  };
  return <Component />;
};

export const ErrorUI = () => {
  const Component = () => <div>Error</div>;
  return <Component />;
};
