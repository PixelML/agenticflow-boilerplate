import { NextResponse } from 'next/server';
import { ofetch } from 'ofetch';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const workflow = await ofetch(`/api/workflows/${params.id}`, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.AGENTICFLOW_API_KEY}`,
      },
    });

    return NextResponse.json(workflow);
  } catch (error) {
    return NextResponse.json({ message: 'Workflow not found' }, { status: 404 });
  }
}
