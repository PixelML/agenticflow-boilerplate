import { NextResponse } from 'next/server';
import { ofetch } from 'ofetch';

export async function GET() {
  try {
    const workflow = await ofetch(`/api/workspaces/${process.env.AGENTICFLOW_TEAMSPACE_ID}/workflows`, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.AGENTICFLOW_API_KEY}`,
      },
    });

    return NextResponse.json(workflow);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: 'Workflow not found' }, { status: 404 });
  }
}
