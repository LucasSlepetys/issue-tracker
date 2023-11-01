'use client';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const Issues = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push('/issues/new')}>New Issue</Button>
    </div>
  );
};

export default Issues;
