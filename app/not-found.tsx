'use client';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  const goBackHome = () => {
    router.push('/');
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className='flex flex-col items-center justify-center mt-48 text-gray-800 font-sans'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold mb-2'>404 - Page Not Found</h1>
        <p className='text-lg'>
          Oops! Looks like youve ventured into unknown territory.
        </p>
      </div>
      <div className='flex space-x-4'>
        <button
          onClick={goBackHome}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        >
          Go Back Home
        </button>
        <button
          onClick={goBack}
          className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
        >
          Go Back
        </button>
      </div>
      <div className='h-12 w-12 rounded-full bg-blue-500 mt-8 animate-bounce'></div>
    </div>
  );
};

export default NotFoundPage;
