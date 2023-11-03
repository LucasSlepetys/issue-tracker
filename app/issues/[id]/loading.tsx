import { Box, Flex } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const loading = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height={'2rem'} />
      <Flex gap={'4'} mb={'6'} mt={'2'}>
        <Skeleton width={'2rem'} />
        <Skeleton width={'4rem'} />
      </Flex>
      <Skeleton height={'16rem'} />
    </Box>
  );
};

export default loading;
