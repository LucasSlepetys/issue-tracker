import { StatusComponent } from '@/app/components';
import { Issue } from '@prisma/client';
import { Flex, Card, Text } from '@radix-ui/themes';
import React from 'react';
import Markdown from 'react-markdown';
export function IssueDescription({ issue }: { issue: Issue }) {
  const dt = new Date(issue.createdAt);
  return (
    <>
      <Text size={'7'}>{issue.title}</Text>
      <Flex gap={'4'} mb={'6'} mt={'2'}>
        <StatusComponent status={issue.status} />
        <Text>{dt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full'>
        <Markdown className='markdown'>{issue.description}</Markdown>
      </Card>
    </>
  );
}
