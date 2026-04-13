import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json();
  // TODO: backend integration - persist to CRM/email provider with server-side rate limiting.
  if (!payload?.email) return NextResponse.json({ ok: false }, { status: 400 });
  await new Promise((r) => setTimeout(r, 500));
  return NextResponse.json({ ok: true });
}
