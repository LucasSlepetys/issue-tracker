'use client';

import { LatestIssueRow } from './LatestIssueRow';
import { Avatar, Card, Container, Flex, Table, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Skeleton, StatusComponent } from '../../components';
import Link from 'next/link';

const LatestIssuesSkeleton = () => {
  const numberOfIssues = [0, 1, 2, 3, 4];

  return (
    <Card>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Skeleton width={'9rem'} height={'1rem'} />
            </Table.Cell>
          </Table.Row>
          {numberOfIssues.map((index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Flex justify={'between'}>
                    <Flex direction={'column'} align='start' gap='2'>
                      <Skeleton width={'6rem'} height={'1rem'} />
                      <Skeleton width={'4rem'} height={'1rem'} />
                    </Flex>
                    <Skeleton width={'2rem'} height={'2rem'} circle={true} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssuesSkeleton;
