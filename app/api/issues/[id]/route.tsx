import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  //check if issue which id exists
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
