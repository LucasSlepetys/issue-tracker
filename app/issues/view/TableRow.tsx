import { StatusComponent, Link } from '../../components';
import { Issue } from '@prisma/client';
import { Table } from '@radix-ui/themes';

export function TableRow({ title, createdAt, id, status }: Issue) {
  const dt = new Date(createdAt);
  return (
    <Table.Row>
      <Table.RowHeaderCell>
        <Link href={`/issues/${id}`}>{title}</Link>
        <p className='mt-2 md:hidden'>{<StatusComponent status={status} />}</p>
      </Table.RowHeaderCell>
      <Table.Cell className='hidden md:table-cell'>
        <StatusComponent status={status} />
      </Table.Cell>
      <Table.Cell className='hidden md:table-cell'>
        {dt.toDateString()}
      </Table.Cell>
    </Table.Row>
  );
}
