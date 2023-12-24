'use client';

import { LatestIssueRow } from './LatestIssueRow';
import { Avatar, Card, Container, Flex, Table, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { StatusComponent } from '../../_components';
import Link from 'next/link';

import { Issue as PrismaIssue, User } from '@prisma/client';
import LatestIssuesSkeleton from './LatestIssuesSkeleton';
interface Issue extends PrismaIssue {
  assignedToUser?: User | null; // Assuming User is another type/interface
}

const LatestIssues = () => {
  const { data: latestIssues, error, isLoading } = useLatestIssues();

  if (isLoading) return <LatestIssuesSkeleton />;
  if (error) return <h1>Error!</h1>;

  console.log(latestIssues);

  return (
    latestIssues && (
      <Card className='shadow-lg'>
        <Table.Root>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Text size='7' color='gray' weight='bold'>
                  Latest Issues
                </Text>
              </Table.Cell>
            </Table.Row>
            {latestIssues.map((issue) => {
              return <LatestIssueRow key={issue.id} {...issue} />;
            })}
          </Table.Body>
        </Table.Root>
      </Card>
    )
  );
};

const useLatestIssues = () =>
  useQuery<Issue[]>({
    queryKey: ['latestIssues'],
    queryFn: () =>
      axios
        .get('/api/issues', { params: { latest: 'true' } })
        .then((res) => res.data.latestIssues),
    staleTime: 5 * 1000,
    retry: 3,
  });

export default LatestIssues;
