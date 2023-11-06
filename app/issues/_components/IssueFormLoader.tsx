import { Skeleton } from '@/app/components';

const IssueFormLoader = () => {
  return (
    <form className='max-w-lg ml-8 space-y-4 mr-4'>
      <Skeleton height={'1.5rem'} className='mb-4' />
      <Skeleton height={'1.5rem'} className='mb-2' />
      <Skeleton height={'20rem'} className='mb-24' />

      <Skeleton width={'7rem'} height={'2rem'} />
    </form>
  );
};

export default IssueFormLoader;
