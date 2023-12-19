'use client';
import { StatusComponent } from '@/app/components';
import { Issue } from '@prisma/client';
import { Flex, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useState } from 'react';
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from '@radix-ui/react-icons';
import { useParams, useSearchParams } from 'next/navigation';

export function IssuesTable({ issues }: { issues: Issue[] }) {
  const [isOrder, setIsOrder] = useState(true);

  const searchParams = useSearchParams();
  const paramsObj = Object.fromEntries(searchParams.entries());

  const orderBy = paramsObj?.orderBy;

  const changeOrder = () => {
    setIsOrder(!isOrder);
  };

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <Link
              href={{
                pathname: '/issues/view',
                query: {
                  ...paramsObj,
                  orderBy: 'title',
                  order: isOrder ? 'asc' : 'desc',
                },
              }}
              passHref
              onClick={changeOrder}
            >
              <Flex align={'center'} gap={'2'}>
                <Text>Title</Text>
                {orderBy === 'title' &&
                  (isOrder ? <DoubleArrowDownIcon /> : <DoubleArrowUpIcon />)}
              </Flex>
            </Link>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>
            <Link
              href={{
                pathname: '/issues/view',
                query: {
                  ...paramsObj,
                  orderBy: 'createdAt',
                  order: isOrder ? 'asc' : 'desc',
                },
              }}
              passHref
              onClick={changeOrder}
            >
              <Flex align={'center'} gap={'2'}>
                <Text>Created At</Text>
                {orderBy === 'createdAt' &&
                  (isOrder ? <DoubleArrowDownIcon /> : <DoubleArrowUpIcon />)}
              </Flex>
            </Link>
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue: Issue) => {
          const dt = new Date(issue.createdAt);
          return (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <p className='mt-2 md:hidden'>
                  {<StatusComponent status={issue.status} />}
                </p>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <StatusComponent status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {dt.toDateString()}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
