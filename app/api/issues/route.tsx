import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '../../issueSchema';

//get all issues from the db
export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();

  return NextResponse.json({ issues: issues }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );

  const res = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json({ issue: res }, { status: 201 });
}
