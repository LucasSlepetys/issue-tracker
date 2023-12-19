'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const statuses: {
  label: string;
  value?: Status | '';
}[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  return (
    <Select.Root
      onValueChange={(status) => {
        if (status) params.set('status', status);

        router.push(`/issues/view?${params.toString()}`);
      }}
    >
      <Select.Trigger placeholder='Select the status' />
      <Select.Content>
        {statuses.map((status) => {
          return (
            <Select.Item
              key={status.value || 'all'}
              value={status.value || 'all'}
            >
              {status.label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
