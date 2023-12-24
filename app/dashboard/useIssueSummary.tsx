import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type IssuesSummaryAlias = {
  openIssuesCount: number;
  inProgressIssuesCount: number;
  closedIssuesCount: number;
};

export const useIssuesSummary = () =>
  useQuery<IssuesSummaryAlias>({
    queryKey: ['issuesSummary'],
    queryFn: () =>
      axios
        .get('/api/issues', { params: { summary: 'true' } })
        .then((res) => res.data),
    staleTime: 5 * 1000,
    retry: 3,
  });
