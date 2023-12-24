import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '../../issueSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/AuthOptions';
import { Status } from '@prisma/client';

const validStatusFilter: Status[] = ['OPEN', 'CLOSED', 'IN_PROGRESS'];

//get all issues from the db
export async function GET(request: NextRequest) {
  //----------------------Issues summary------------------------
  const summaryQueryParam =
    request.nextUrl.searchParams.get('summary') || 'false';
  const summary = summaryQueryParam === 'true' ? true : false;

  if (summary) {
    const openIssuesCount = await prisma.issue.count({
      where: {
        status: 'OPEN',
      },
    });

    const inProgressIssuesCount = await prisma.issue.count({
      where: {
        status: 'IN_PROGRESS',
      },
    });

    const closedIssuesCount = await prisma.issue.count({
      where: {
        status: 'CLOSED',
      },
    });

    return NextResponse.json(
      { openIssuesCount, inProgressIssuesCount, closedIssuesCount },
      { status: 200 }
    );
  }

  //----------------------latest issues------------------------

  const latestQueryParam =
    request.nextUrl.searchParams.get('latest') || 'false';
  const latest = latestQueryParam === 'true' ? true : false;

  if (latest) {
    const latestIssues = await prisma.issue.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        assignedToUser: true,
      },
    });

    return NextResponse.json({ latestIssues }, { status: 200 });
  }

  //----------------------page------------------------

  const pageQueryParam = request.nextUrl.searchParams.get('page') || '1';
  const page = parseInt(pageQueryParam);

  const pageSize = 10; //10 items per page

  //----------------------orderByStatusQueryParam------------------------

  const orderByStatusQueryParam =
    request.nextUrl.searchParams.get('status') || '';

  const orderByStatus: Status | undefined = validStatusFilter.includes(
    orderByStatusQueryParam as Status
  )
    ? (orderByStatusQueryParam as Status)
    : undefined;

  //----------------------orderByAscOrDescQueryParam------------------------

  const orderByAscOrDescQueryParam = request.nextUrl.searchParams.get('order');
  const orderByAscOrDesc: 'asc' | 'desc' =
    orderByAscOrDescQueryParam === 'asc' ||
    orderByAscOrDescQueryParam === 'desc'
      ? orderByAscOrDescQueryParam
      : 'asc';

  //----------------------orderByTitleOrCreateQueryParam------------------------

  const orderByTitleOrCreateQueryParam =
    request.nextUrl.searchParams.get('orderBy');

  const orderByTitleOrCreate: 'title' | 'createdAt' | undefined =
    orderByTitleOrCreateQueryParam === 'title' ||
    orderByTitleOrCreateQueryParam === 'createdAt'
      ? orderByTitleOrCreateQueryParam
      : undefined;

  const orderByObj = orderByTitleOrCreate
    ? {
        [orderByTitleOrCreate]: orderByAscOrDesc,
      }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: orderByStatus,
    },
    orderBy: orderByObj,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalIssues = await prisma.issue.count({
    where: {
      status: orderByStatus,
    },
  });

  // return NextResponse.json({ issues: issues }, { status: 200 });
  return NextResponse.json({ issues, totalIssues }, { status: 200 });
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
