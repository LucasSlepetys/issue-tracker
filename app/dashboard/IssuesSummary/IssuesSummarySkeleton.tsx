import React from 'react';
import { Skeleton, StatusComponent } from '../../components';
import { Flex, Card } from '@radix-ui/themes';

const IssuesSummarySkeleton = () => {
  const statusCount = [0, 1, 2];
  return (
    <Flex gap='4'>
      {statusCount.map((index) => {
        return (
          <Card key={index}>
            <Flex direction={'column'} gap='2'>
              <Skeleton width={'7rem'} height='1rem' />
              <Skeleton width={'1.3rem'} height='1.3rem' />
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssuesSummarySkeleton;
