import { NextResponse } from 'next/server';
import { ofetch } from 'ofetch';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const workflow = await ofetch(`/workflows/${params.id}`, {
      baseURL: 'https://api.workflowchef.ai/api',
      headers: {
        Authorization: `Bearer ${process.env.AGENTICFLOW_ACCESS_TOKEN}`,
      },
    });

    return NextResponse.json(workflow);
  } catch (error) {
    return NextResponse.json({ message: 'Workflow not found' }, { status: 404 });
  }
}
