import { Issue } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import { TableColumn } from './TableColumn';
import { TableRow } from './TableRow';

const columns = [
  {
    text: 'Title',
    orderByValue: 'title',
    className: '',
  },
  {
    text: 'Status',
    orderByValue: 'status',
    className: 'hidden md:table-cell',
  },
  {
    text: 'Created At',
    orderByValue: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

export function IssuesTable({ issues }: { issues: Issue[] }) {
  return (
    <Table.Root variant='surface' className='shadow-lg'>
      <Table.Header>
        <Table.Row className='bg-blue-200'>
          {columns.map((column) => {
            return <TableColumn key={column.text} {...column} />;
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => {
          return <TableRow key={issue.id} {...issue} />;
        })}
      </Table.Body>
    </Table.Root>
  );
}
