import { Skeleton } from '@/app/components';

const loading = () => {
  return (
    <form className='max-w-lg ml-8 space-y-4 mr-4'>
      <Skeleton />
      <Skeleton />
      <Skeleton height={'20rem'} />

      <Skeleton width={'7rem'} height={'3rem'} />
    </form>
  );
};

export default loading;
