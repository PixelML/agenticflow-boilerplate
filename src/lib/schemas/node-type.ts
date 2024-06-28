import { z } from 'zod';

export type NodeType = z.infer<typeof nodeTypeSchema>;

export const nodeTypeSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    title: z.string(),
    description: z.string(),
    input_schema: z
      .object({
        title: z.string().catch(() => 'Untitled'),
        description: z.string().catch(() => ''),
        required: z.array(z.string()).catch(() => []),
        properties: z.record(
          z
            .object({
              title: z.string(),
              description: z.string().catch(() => ''),
              ui_metadata: z
                .object({
                  type: z.string().nullable(),
                  value: z.any().nullable(),
                })
                .passthrough()
                .optional(),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    output_schema: z
      .object({
        required: z.array(z.string()).catch(() => []),
        properties: z.record(
          z
            .object({
              items: z.object({}).passthrough().optional(),
              ui_metadata: z.object({}).passthrough().optional(),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
  })
  .passthrough();
