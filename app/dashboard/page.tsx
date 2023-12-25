import React from 'react';

import IssuesSummaryComponent from './_IssuesSummary/IssuesSummary';
import IssueSummaryChart from './_IssueSummaryChart/IssueSummaryChart';
import LatestIssues from './_LatestIssues/LatestIssues';
import { Grid, Flex } from '@radix-ui/themes';

const Dashboard = () => {
  return (
    <div>
      <Grid columns={{ initial: '1', md: '2' }} gap='5'>
        <Flex direction='column' gap='5'>
          <IssuesSummaryComponent />
          <IssueSummaryChart />
        </Flex>
        <LatestIssues />
      </Grid>
    </div>
  );
};

export default Dashboard;
