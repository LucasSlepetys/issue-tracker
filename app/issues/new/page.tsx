import dynamic from 'next/dynamic';
import IssueFormLoader from '../_components/IssueFormLoader';

const IssueForm = dynamic(() => import('../_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormLoader />,
});

const NewIssue = async () => {
  return <IssueForm />;
};

export default NewIssue;
