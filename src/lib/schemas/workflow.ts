import { z } from 'zod';

export type Workflow = z.infer<typeof workflowSchema>;

export type WorkflowRun = z.infer<typeof workflowRunSchema>;

export const workflowSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    input_schema: z
      .object({
        title: z.string().catch(() => 'Untitled'),
        description: z.string().catch(() => ''),
        required: z.array(z.string()).catch(() => []),
        properties: z
          .record(
            z
              .object({
                type: z.string().optional(),
                title: z.string(),
                description: z.string().catch(() => ''),
                ui_metadata: z
                  .object({
                    order: z
                      .number()
                      .optional()
                      .catch(() => 0),
                    type: z.string().nullable(),
                    value: z.any().nullable(),
                  })
                  .passthrough()
                  .optional(),
              })
              .passthrough()
          )
          .catch(() => ({})),
      })
      .passthrough(),
    nodes: z
      .object({
        nodes: z.array(
          z
            .object({
              title: z.string().nullable(),
              node_type_name: z.string(),
              name: z.string(),
              description: z.string().catch(() => ''),
              input_config: z.record(z.any()),
            })
            .passthrough()
        ),
      })
      .transform((data) => data.nodes),
    output_mapping: z.record(z.string()),
    public_runnable: z.boolean(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
  })
  .passthrough();

export const workflowRunSchema = z
  .object({
    id: z.string(),
    workflow_id: z.string(),
    output: z.object({}).passthrough().nullable(),
    status: z.enum(['created', 'not_started', 'queued', 'running', 'success', 'failed', 'cancelled']),
    state: z
      .object({
        nodes_state: z.array(
          z
            .object({
              completed_at: z.string().nullable(),
              status: z.string(),
              node_name: z.string(),
              input: z
                .object({})
                .passthrough()
                .catch(() => ({})),
              output: z
                .object({})
                .passthrough()
                .nullable()
                .catch(() => ({})),
            })
            .passthrough()
        ),
      })
      .passthrough()
      .catch(() => ({} as any)),
    workflow_config_override: z
      .object({
        nodes: z.array(
          z
            .object({
              name: z.string(),
              title: z.string().catch(() => ''),
              node_type_name: z.string().catch(() => ''),
            })
            .passthrough()
        ),
        output_mapping: z.record(z.string()).catch(() => ({})),
      })
      .passthrough(),
    started_at: z.string().nullable(),
    completed_at: z.string().nullable(),
    updated_at: z
      .string()
      .nullable()
      .catch(() => null),
  })
  .passthrough();
