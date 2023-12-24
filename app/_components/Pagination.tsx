'use client';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, currentPage, pageSize }: Props) => {
  if (!currentPage) currentPage = 1;
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  return (
    <Flex
      align={'center'}
      gap={'2'}
      className=' py-2 px-4 rounded-full shadow-lg focus:shadow-none'
    >
      <Button
        color={'gray'}
        variant='soft'
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        {<DoubleArrowLeftIcon />}
      </Button>
      <Button
        color={'gray'}
        variant='soft'
        mx={'2'}
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        {<ChevronLeftIcon />}
      </Button>

      <Text size='4' mx='2'>
        Page <span className='font-semibold'>{currentPage}</span> of {pageCount}
      </Text>

      <Button
        color={'gray'}
        variant='soft'
        mx={'2'}
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        {<ChevronRightIcon />}
      </Button>
      <Button
        color={'gray'}
        variant='soft'
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        {<DoubleArrowRightIcon />}
      </Button>
    </Flex>
  );
};

export default Pagination;
