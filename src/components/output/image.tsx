/* eslint-disable @next/next/no-img-element */

import { Skeleton } from '#/components/ui/skeleton';
import { z } from 'zod';

export const typeSchema = z.object({
  type: z.literal('string'),
  ui_metadata: z.object({
    type: z.literal('media_url'),
    media_type: z.literal('image'),
  }),
});

export const resultSchema = z.string();

export const LoadingUI = () => {
  const Component = () => {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <Skeleton className="w-full aspect-video max-w-[640px] " />
      </div>
    );
  };
  return <Component />;
};

export const ResultUI = (data: z.infer<typeof resultSchema>) => {
  const Component = () => {
    return (
      <div className="w-full flex flex-col gap-3 items-center justify-center p-2">
        <img className="w-full rounded-sm max-w-[640px]" src={data} alt="" />
      </div>
    );
  };
  return <Component />;
};

export const ErrorUI = () => {
  const Component = () => <div>Error</div>;
  return <Component />;
};
