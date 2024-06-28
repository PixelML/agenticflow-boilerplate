import { NodeType } from '#/lib/schemas/node-type';
import { Workflow, WorkflowRun } from '#/lib/schemas/workflow';
import { ofetch } from 'ofetch';
import React from 'react';
import { NodeOutput } from './node-output';

interface Props {
  workflow: Workflow;
  workflowRun: null | WorkflowRun;
}

let didInit = false;
function WorkflowRunOutputs({ workflow, workflowRun }: Props) {
  const [nodeTypes, setNodeTypes] = React.useState<NodeType[]>([]);

  React.useEffect(() => {
    if (!didInit) {
      didInit = true;
      return;
    }

    ofetch('https://api.workflowchef.ai/api/node_types/').then((res) => {
      setNodeTypes(res);
    });
  }, []);

  if (nodeTypes.length === 0) return null;

  const outputs = workflow.nodes
    .map((node) => {
      const nodeType = nodeTypes.find((nodeType) => nodeType.name === node.node_type_name);
      return nodeType as NodeType;
    })
    .filter(Boolean)
    .map((nodeType: NodeType, index) => {
      const title = workflow.nodes[index].title || workflow.nodes[index].name;
      const status = workflowRun?.state.nodes_state[index]?.status;

      return {
        nodeType,
        title,
        status,
        data: workflowRun?.state.nodes_state[index]?.output,
      };
    });

  return (
    <div className="flex w-full mx-auto max-w-screen-sm gap-2 flex-col">
      {outputs.map((output, index) => (
        <NodeOutput
          key={index}
          nodeType={output.nodeType}
          title={output.title || ''}
          status={output.status}
          data={output.data}
        />
      ))}
    </div>
  );
}

export default WorkflowRunOutputs;
