import { Issue } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import { StatusComponent, Link } from '../../components';
import { Actions } from './actions';
import { GET_ISSUES } from '../_axios/REQUESTS';

const Issues = async () => {
  const { issues, error } = await GET_ISSUES();

  if (error) {
    console.log(error);
    return <p>Error!</p>;
  }

  return (
    issues && (
      <div>
        <Actions />
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>
                Created at
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue: Issue) => {
              const dt = new Date(issue.createdAt);
              return (
                <Table.Row key={issue.id}>
                  <Table.RowHeaderCell>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <p className='mt-2 md:hidden'>
                      {<StatusComponent status={issue.status} />}
                    </p>
                  </Table.RowHeaderCell>
                  <Table.Cell className='hidden md:table-cell'>
                    <StatusComponent status={issue.status} />
                  </Table.Cell>
                  <Table.Cell className='hidden md:table-cell'>
                    {dt.toDateString()}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </div>
    )
  );
};

export const dynamic = 'force-dynamic';

export default Issues;
