import { Skeleton } from '#/components/ui/skeleton';
import { z } from 'zod';
import { Button } from '../ui/button';

export const typeSchema = z.object({
  type: z.literal('string'),
  ui_metadata: z.object({
    type: z.literal('media_url'),
    media_type: z.literal('audio'),
  }),
});

export const resultSchema = z.string();

export const LoadingUI = () => {
  const Component = () => {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <Skeleton className="w-full h-8 " />
      </div>
    );
  };

  return <Component />;
};

export const ResultUI = (data: z.infer<typeof resultSchema>) => {
  const Component = () => {
    return (
      <div className="w-full flex flex-col gap-3 items-center justify-center p-2">
        <audio className="w-full" src={data} controls></audio>
      </div>
    );
  };

  return <Component />;
};

export const ErrorUI = () => {
  const Component = () => <div>Error</div>;
  return <Component />;
};
