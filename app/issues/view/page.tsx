import { IssuesTable } from './IssuesTable';
import { Issue, Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import { StatusComponent, Link } from '../../components';
import { Actions } from './actions';
import { GET_ISSUES, Params } from '../_axios/REQUESTS';

interface SearchParams {
  searchParams: Params;
}

const Issues = async ({ searchParams }: SearchParams) => {
  const { issues, error } = await GET_ISSUES(searchParams);

  if (error) {
    console.log(error);
    return <p>Error!</p>;
  }

  return (
    issues && (
      <div>
        <Actions />
        <IssuesTable issues={issues} />
      </div>
    )
  );
};

export const dynamic = 'force-dynamic';

export default Issues;
