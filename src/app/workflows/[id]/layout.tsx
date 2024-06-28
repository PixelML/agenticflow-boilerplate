'use client';

import { workflowSchema } from '#/lib/schemas/workflow';
import { useSetWorkflowState, useWorkflowState } from '#/state/workflow';
import { ofetch } from 'ofetch';
import React from 'react';

interface Props extends React.PropsWithChildren {
  params: {
    id: string;
  };
}

function Layout({ children, params }: Props) {
  const { workflow } = useWorkflowState();
  const { setWorkflow } = useSetWorkflowState();

  const [isFetchingWorkflow, setIsFetchingWorkflow] = React.useState(true);

  React.useEffect(() => {
    ofetch(`/api/workflows/${params.id}`)
      .then((res) => {
        setWorkflow(workflowSchema.parse(res));
      })
      .catch(() => {
        //
      })
      .finally(() => {
        setIsFetchingWorkflow(false);
      });

    return () => {
      setWorkflow(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (isFetchingWorkflow) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!workflow) {
    return <div className="flex items-center justify-center min-h-screen">Workflow not found</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default Layout;
