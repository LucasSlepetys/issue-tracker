import { Table, Flex, Avatar } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { StatusComponent } from '../../components';
import { Issue as PrismaIssue, User } from '@prisma/client';
interface Issue extends PrismaIssue {
  assignedToUser?: User | null; // Assuming User is another type/interface
}
export function LatestIssueRow({ id, title, status, assignedToUser }: Issue) {
  return (
    <Table.Row key={id}>
      <Table.Cell>
        <Flex justify={'between'}>
          <Flex direction={'column'} align='start' gap='2'>
            <Link href={`/issues/${id}`}>{title}</Link>
            <StatusComponent status={status} />
          </Flex>
          {assignedToUser && (
            <Avatar
              fallback='?'
              src={assignedToUser?.image!}
              size='2'
              radius='full'
            />
          )}
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
}
