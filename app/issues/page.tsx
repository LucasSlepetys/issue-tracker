import { Actions } from './actions';
import { Table } from '@radix-ui/themes';
import axios from 'axios';
import { Issue } from '@prisma/client';
import StatusComponent from '../components/Status';
import delay from 'delay';

const Issues = async () => {
  const {
    data: { issues },
  } = await axios.get('http://localhost:3000/api/issues');

  return (
    <div className='m-4'>
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
                  {issue.title}
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
  );
};

export default Issues;
