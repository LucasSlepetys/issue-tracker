'use client';
import Pagination from '@/app/components/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { GET_ISSUES, Params } from '../_axios/REQUESTS';
import { IssuesTable } from './IssuesTable';
import { Actions } from './actions';
import { Flex } from '@radix-ui/themes';

interface SearchParams {
  searchParams: Params;
}

const Issues = async ({ searchParams }: SearchParams) => {
  const { issues, error, totalIssues } = await GET_ISSUES(searchParams);

  if (error) {
    console.log(error);
    return <p>Error!</p>;
  }

  return (
    issues && (
      <div>
        <Actions />
        <IssuesTable issues={issues} />
        <Flex mt={'4'} justify={'center'}>
          <Pagination
            itemCount={totalIssues}
            currentPage={parseInt(searchParams.page)}
            pageSize={10}
          />
        </Flex>
      </div>
    )
  );
};

export const dynamic = 'force-dynamic';

export default Issues;
