'use client';

import { useWorkflowState } from '#/state/workflow';
import WorkflowRunForm from './workflow-run-form';
import WorkflowRunOutputs from './workflow-run-outputs';

function Page() {
  const { workflow, workflowRun, formData, isRunning } = useWorkflowState();

  if (!workflow) return null;

  return (
    <div className="flex p-4 flex-col min-h-screen bg-muted gap-5">
      <WorkflowRunForm workflow={workflow} formData={formData} isRunning={isRunning} />
      <WorkflowRunOutputs workflow={workflow} workflowRun={workflowRun} />
    </div>
  );
}

export default Page;
