import React, { useEffect } from 'react';
import Pagination from '../components/Pagination';
import LatestIssues from './LatestIssues/LatestIssues';
import IssuesSummaryComponent from './IssuesSummary/IssuesSummary';

const Dashboard = ({ searchParams }: { searchParams: { page: string } }) => {
  //build separate hook for fetching issues summary
  //add graphs using this hook
  //put it all into the page
  return (
    <div>
      {/* <LatestIssues /> */}
      <IssuesSummaryComponent />
    </div>
  );
};

export default Dashboard;
