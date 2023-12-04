import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '../../issueSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/AuthOptions';

//get all issues from the db
export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();

  return NextResponse.json({ issues: issues }, { status: 200 });
}

export async function POST(request: NextRequest) {
  //validate the user is authenticated:
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

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
