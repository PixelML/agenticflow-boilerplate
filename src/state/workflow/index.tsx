import { toast } from '#/components/ui/use-toast';
import { Workflow, WorkflowRun, workflowRunSchema } from '#/lib/schemas/workflow';
import { timeout } from '#/lib/sync/timeout';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { ofetch } from 'ofetch';
import React from 'react';

interface Props extends React.PropsWithChildren {}

type StateContext = {
  workflow: null | Workflow;
  workflowRun: null | WorkflowRun;
  formData: Record<string, any>;
  isRunning: boolean;
};

type SetStateContext = {
  setWorkflow: (workflow: null | Workflow) => void;
  setFormData: (formData: Record<string, any>) => void;
  onRunWorkflow: () => void;
};

const StateContext = React.createContext<StateContext>({} as StateContext);
const SetStateContext = React.createContext<SetStateContext>({} as SetStateContext);

export function Provider({ children }: Props) {
  const [state, setState] = React.useState<StateContext>({
    workflow: null,
    workflowRun: null,
    formData: {},
    isRunning: false,
  });

  const setWorkflow: SetStateContext['setWorkflow'] = async (workflow) => {
    if (workflow) {
      await $RefParser.dereference(workflow.input_schema).then((schema) => {
        workflow.input_schema = schema as Workflow['input_schema'];
      });

      const formData: Record<string, any> = {};

      Object.entries(workflow.input_schema.properties).forEach(([key, value]) => {
        formData[key] = value.ui_metadata?.value || value.default;
      });

      setState((prevState) => ({
        ...prevState,
        workflow,
        formData,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        workflow,
      }));
    }
  };

  const setFormData: SetStateContext['setFormData'] = (formData) => {
    setState((prevState) => ({
      ...prevState,
      formData,
    }));
  };

  const onRunWorkflow = async () => {
    if (!state.workflow) return;

    const formData = new FormData();
    formData.append('input', JSON.stringify(state.formData));

    setState((prevState) => ({
      ...prevState,
      isRunning: true,
    }));

    let workflowRun = await ofetch(`/api/workflow-run/${state.workflow.id}`, {
      method: 'POST',
      body: formData,
    });

    workflowRun = workflowRunSchema.parse(workflowRun);

    setState((prevState) => ({
      ...prevState,
      workflowRun,
    }));

    while (workflowRun.status !== 'success') {
      await timeout(5000);
      const checkWorkflowRunResponse = await ofetch(`/api/workflow-run/${workflowRun.id}`);

      workflowRun = workflowRunSchema.parse(checkWorkflowRunResponse);

      setState((prevState) => ({
        ...prevState,
        workflowRun,
      }));

      if (workflowRun.status === 'failed') {
        toast({
          variant: 'destructive',
          title: 'Workflow failed',
        });
        break;
      }

      if (workflowRun.status === 'cancelled') {
        toast({
          variant: 'destructive',
          title: 'Workflow cancelled',
        });
        break;
      }

      if (workflowRun.status === 'success') {
        toast({
          title: 'Workflow completed',
        });

        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 500);
        break;
      }
    }

    setState((prevState) => ({
      ...prevState,
      isRunning: false,
    }));
  };

  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider
        value={{
          setWorkflow,
          setFormData,
          onRunWorkflow,
        }}
      >
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}

export function useWorkflowState() {
  return React.useContext(StateContext);
}

export function useSetWorkflowState() {
  return React.useContext(SetStateContext);
}
