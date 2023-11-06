import dynamic from 'next/dynamic';
import IssueFormLoader from '../../_components/IssueFormLoader';

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormLoader/>,
});

const EditIssue = async ({ params: { id } }: { params: { id: string } }) => {
  return <IssueForm id={id} />;
};

export default EditIssue;
