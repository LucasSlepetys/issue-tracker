'use client';
import { Pagination } from '@/app/components';
import { Issue } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import React from 'react';
import { IssuesTable } from './IssuesTable';
import { Actions } from './actions';
import { Params } from '../_axios/REQUESTS';

interface Props {
  searchParams: Params;
  issues: Issue[];
  totalIssues: number;
}

export function Layout({ issues, totalIssues, searchParams }: Props) {
  return (
    <div>
      <Actions />
      <IssuesTable issues={issues} />
      <Flex mt={'4'} justify={'center'}>
        <Pagination
          itemCount={totalIssues}
          currentPage={parseInt(searchParams.page)}
          pageSize={10}
        />
      </Flex>
    </div>
  );
}
