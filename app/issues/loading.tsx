import { Issue } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Actions } from './actions';

const loading = () => {
  const issues = [1, 2, 3, 4, 5, 6];

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
          {issues.map((issue) => {
            return (
              <Table.Row key={issue}>
                <Table.RowHeaderCell>
                  <Skeleton />
                </Table.RowHeaderCell>
                <Table.Cell className='hidden md:table-cell'>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default loading;
