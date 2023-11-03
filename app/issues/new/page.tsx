'use client';
import {ErrorCallout, Loading} from '@/app/components';
import { issueSchema } from '@/app/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type IssueForm = z.infer<typeof issueSchema>;
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const NewIssue = async () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createNewIssue = async (data: IssueForm) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('An error has happened!');
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className='max-w-lg ml-8 space-y-4 mr-4'
      onSubmit={handleSubmit((data: IssueForm) => createNewIssue(data))}
    >
      <ErrorCallout>{error}</ErrorCallout>
      <Text size={'5'}>Create new issue</Text>
      <ErrorCallout>{errors.title?.message}</ErrorCallout>
      {/* text field component */}
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height='16' width='16' />
        </TextField.Slot>
        <TextField.Input placeholder='Issue title' {...register('title')} />
      </TextField.Root>
      <ErrorCallout>{errors.description?.message}</ErrorCallout>
      {/* description field component */}
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Issue description' {...field} />
        )}
      />

      <Button disabled={isSubmitting}>
        Create issue {isSubmitting && <Loading />}
      </Button>
    </form>
  );
};

export default NewIssue;
