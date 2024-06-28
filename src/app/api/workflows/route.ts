import { NextResponse } from 'next/server';
import { ofetch } from 'ofetch';

export async function GET() {
  try {
    const workflow = await ofetch(`/workspaces/${process.env.AGENTICFLOW_TEAMSPACE_ID}/workflows`, {
      baseURL: 'https://api.workflowchef.ai/api',
      headers: {
        Authorization: `Bearer ${process.env.AGENTICFLOW_ACCESS_TOKEN}`,
      },
    });

    return NextResponse.json(workflow);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: 'Workflow not found' }, { status: 404 });
  }
}
