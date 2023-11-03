import { StatusComponent } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Container, Flex, Text } from '@radix-ui/themes';
import axios from 'axios';
import Markdown from 'react-markdown';

const issuePage = async ({ params: { id } }: { params: { id: string } }) => {
  const {
    data: { issue },
  }: { data: { issue: Issue } } = await axios.get(
    `http://localhost:3000/api/issues/${id}`
  );

  const dt = new Date(issue.createdAt);

  return (
    <Container className='max-w-xl'>
      <Text size={'7'}>{issue.title}</Text>
      <Flex gap={'4'} mb={'6'} mt={'2'}>
        <StatusComponent status={issue.status} />
        <Text>{dt.toDateString()}</Text>
      </Flex>
      <Card>
        <Markdown className='markdown'>{issue.description}</Markdown>
      </Card>
    </Container>
  );
};

export default issuePage;
