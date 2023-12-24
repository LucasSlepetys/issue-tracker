'use client';
import { Status } from '@prisma/client';
import { Box, Card, Container, Flex, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import IssuesSummarySkeleton from './IssuesSummarySkeleton';

type IssuesSummaryAlias = {
  openIssuesCount: number;
  inProgressIssuesCount: number;
  closedIssuesCount: number;
};

const IssuesSummaryComponent = () => {
  const { data: IssuesSummary, error, isLoading } = useIssuesSummary();

  if (error) return <h1>Error</h1>;
  if (isLoading) return <IssuesSummarySkeleton />;

  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: 'Open Issues',
      value: IssuesSummary?.openIssuesCount || -1,
      status: 'OPEN',
    },
    {
      label: 'In Progress Issues',
      value: IssuesSummary?.inProgressIssuesCount || -1,
      status: 'IN_PROGRESS',
    },
    {
      label: 'Closed Issues',
      value: IssuesSummary?.closedIssuesCount || -1,
      status: 'CLOSED',
    },
  ];

  return (
    <Flex gap='4'>
      {statuses.map((_status) => {
        const { label, value, status } = _status;
        return (
          <Card key={label}>
            <Flex direction={'column'} gap='2'>
              <Link href={`/issues/view?status=${status}`}>{label}</Link>
              <Text size='5' weight='bold'>
                {value}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

//build a separate file hook with this
const useIssuesSummary = () =>
  useQuery<IssuesSummaryAlias>({
    queryKey: ['latestIssues'],
    queryFn: () =>
      axios
        .get('/api/issues', { params: { summary: 'true' } })
        .then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default IssuesSummaryComponent;
