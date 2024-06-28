'use client';

import { cells } from '#/components/form/cells/cells';
import { formRenderers } from '#/components/form/renderers';
import { Button } from '#/components/ui/button';
import { Workflow } from '#/lib/schemas/workflow';
import { useSetWorkflowState } from '#/state/workflow';
import { JsonForms } from '@jsonforms/react';
import { ErrorObject } from 'ajv';
import React from 'react';
import { generateUISchema } from './generate-uischema';
import { Loader2Icon } from 'lucide-react';

interface Props {
  workflow: Workflow;
  formData: Record<string, any>;
  isRunning: boolean;
}

function WorkflowRunForm({ workflow, formData, isRunning }: Props) {
  const { setFormData, onRunWorkflow } = useSetWorkflowState();

  const uischema = generateUISchema(workflow.input_schema);

  const [errors, setErrors] = React.useState<ErrorObject[]>([]);

  const isDisabledSubmit = errors.length > 0;

  return (
    <div className="p-6 border shadow-sm bg-background w-full mx-auto max-w-screen-sm rounded-lg flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">User inputs</h1>
        <p className="text-muted-foreground">User inputs for the workflow</p>
      </div>

      <JsonForms
        data={formData}
        schema={workflow.input_schema}
        uischema={uischema}
        renderers={formRenderers}
        cells={cells}
        validationMode="ValidateAndShow"
        onChange={({ data, errors }) => {
          setErrors((errors as unknown as ErrorObject[]) || []);
          setFormData(data);
        }}
      />

      <div className="flex flex-col gap-2">
        <Button className="w-full" disabled={isDisabledSubmit || isRunning} onClick={onRunWorkflow}>
          {isRunning && <Loader2Icon className="animate-spin mr-2" size={14} />}
          Submit
        </Button>
        <span className="text-xs text-center">
          Powered by{' '}
          <a className="text-primary underline" href="https://agenticflow.ai/" target="_blank">
            AgenticFlow.ai
          </a>
        </span>
      </div>
    </div>
  );
}

export default WorkflowRunForm;
