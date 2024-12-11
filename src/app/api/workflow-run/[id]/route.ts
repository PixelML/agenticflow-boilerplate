import { NextResponse } from 'next/server';
import { ofetch } from 'ofetch';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const workflow = await ofetch(`/workflow_runs/${params.id}`, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.AGENTICFLOW_API_KEY}`,
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
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.AGENTICFLOW_API_KEY}`,
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
