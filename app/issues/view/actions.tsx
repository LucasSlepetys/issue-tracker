'use client';

import { Button, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import IssueStatusFilter from './IssueStatusFilter';

export function Actions({}) {
  const router = useRouter();

  return (
    <Flex justify={'between'}>
      <IssueStatusFilter />
      <Button mb={'4'} onClick={() => router.push('/issues/new')}>
        New Issue
      </Button>
    </Flex>
  );
}
