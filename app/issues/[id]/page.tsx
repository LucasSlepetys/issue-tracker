import { EditIssueBtn } from './EditIssueBtn';
import { IssueDescription } from './IssueDescription';
import { StatusComponent } from '@/app/components';
import { Box, Button, Card, Flex, Grid, Text } from '@radix-ui/themes';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { GET_ISSUE } from '../_axios/REQUESTS';
import { notFound } from 'next/navigation';
import DeleteIssueBtn from './DeleteIssueBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/AuthOptions';
import AssigneeUser from './AssigneeUser';

const issuePage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const { issue, error } = await GET_ISSUE(id);

  if (error) {
    console.log(error);
    notFound();
  } else {
  }

  return (
    issue && (
      <Grid columns={{ initial: '1', md: '5' }} gap='4'>
        <Box className='max-w-xl col-span-4'>
          <IssueDescription issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex direction='column' gap='4'>
              <AssigneeUser issue={issue} />
              <EditIssueBtn id={issue.id} />
              <DeleteIssueBtn id={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    )
  );
};

export default issuePage;
