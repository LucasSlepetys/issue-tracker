'use client';

import React from 'react';
import { useIssuesSummary } from '../useIssueSummary';
import { Card } from '@radix-ui/themes';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';
import IssueSummaryChartSkeleton from './IssueSummaryChartSkeleton';

const IssueSummaryChart = () => {
  const { data: IssuesSummary, error, isLoading } = useIssuesSummary();

  const data: {
    label: string;
    value: number;
  }[] = [
    {
      label: 'Open',
      value: IssuesSummary?.openIssuesCount || 10,
    },
    {
      label: 'In Progress',
      value: IssuesSummary?.inProgressIssuesCount || 10,
    },
    {
      label: 'Closed',
      value: IssuesSummary?.closedIssuesCount || 10,
    },
  ];

  if (error) return <h1>Error</h1>;
  if (isLoading) return <IssueSummaryChartSkeleton />;
  return (
    <Card className='shadow-lg'>
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart data={data}>
          <XAxis dataKey={'label'} />
          <YAxis />
          <Bar
            dataKey={'value'}
            barSize={60}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueSummaryChart;
