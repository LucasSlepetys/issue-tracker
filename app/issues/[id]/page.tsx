import { StatusComponent } from '@/app/components';
import { Box, Button, Card, Flex, Grid, Text } from '@radix-ui/themes';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { GET_ISSUE } from '../_axios/REQUESTS';
import { notFound } from 'next/navigation';

const issuePage = async ({ params: { id } }: { params: { id: string } }) => {
  const { issue, error } = await GET_ISSUE(id);

  if (error) {
    console.log(error);
    notFound();
  }

  const dt = new Date(issue!.createdAt);

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='4'>
      <Box className='max-w-xl'>
        <Text size={'7'}>{issue!.title}</Text>
        <Flex gap={'4'} mb={'6'} mt={'2'}>
          <StatusComponent status={issue!.status} />
          <Text>{dt.toDateString()}</Text>
        </Flex>
        <Card>
          <Markdown className='markdown'>{issue!.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Link href={`/issues/${issue!.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default issuePage;
