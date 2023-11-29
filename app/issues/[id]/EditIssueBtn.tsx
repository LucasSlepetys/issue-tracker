import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
export function EditIssueBtn({ id }: { id: number }) {
  return (
    <Button>
      <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
    </Button>
  );
}
