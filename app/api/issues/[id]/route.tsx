import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '@/app/issueSchema';

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json(
      { error: 'Issue does not exist' },
      { status: 404 }
    );

  return NextResponse.json({ issue: issue }, { status: 200 });
}

//edit an issue given a new title and description
export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  //validate if request body is a valid request
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );

  //check if issue exits given the id in the db
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json(
      { error: 'Issue does not exist' },
      { status: 404 }
    );

  //edit the issue with the new title / description
  const res = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  //return new issue
  return NextResponse.json({ issue: res }, { status: 200 });
}
