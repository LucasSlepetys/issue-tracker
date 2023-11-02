'use client';

import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export function Actions({}) {
  const router = useRouter();

  return (
    <Button mb={'4'} onClick={() => router.push('/issues/new')}>
      New Issue
    </Button>
  );
}
