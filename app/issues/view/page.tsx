import { Layout } from './Layout';
import { GET_ISSUES, Params } from '../_axios/REQUESTS';

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
      <Layout
        issues={issues}
        totalIssues={totalIssues}
        searchParams={searchParams}
      />
    )
  );
};

export const dynamic = 'force-dynamic';

export default Issues;
