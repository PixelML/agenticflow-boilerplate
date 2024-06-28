import { NextResponse } from 'next/server';
import { ofetch } from 'ofetch';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const workflow = await ofetch(`/workflow_runs/${params.id}`, {
      baseURL: 'https://api.workflowchef.ai/api',
      headers: {
        Authorization: `Bearer ${process.env.AGENTICFLOW_ACCESS_TOKEN}`,
      },
    });

    return NextResponse.json(workflow);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: 'Workflow run not found',
      },
      { status: 404 }
    );
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();

    const input = JSON.parse(formData.get('input') as string);

    const workflowRun = await ofetch('/workflow_runs/', {
      method: 'POST',
      baseURL: 'https://api.workflowchef.ai/api',
      headers: {
        Authorization: `Bearer ${process.env.AGENTICFLOW_ACCESS_TOKEN}`,
      },
      body: {
        workflow_id: params.id,
        input,
      },
    });

    return NextResponse.json(workflowRun);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Workflow run failed',
      },
      { status: 404 }
    );
  }
}
