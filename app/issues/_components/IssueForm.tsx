'use client';
import { ErrorCallout, Loading } from '@/app/components';
import { issueSchema } from '@/app/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { GET_ISSUE } from '../_axios/REQUESTS';
import SimpleMDE from 'react-simplemde-editor';
import { Issue } from '@prisma/client';

type IssueFormInterface = z.infer<typeof issueSchema>;

interface Props {
  id?: string;
}

const IssueForm = ({ id }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormInterface>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issue, setIssue] = useState<Issue | null>(null);
  const router = useRouter();

  //checks if id is given and if it is fetchs the issue with the given id
  useEffect(() => {
    const fetchIssue = async () => {
      if (id) {
        try {
          const response = await GET_ISSUE(id);
          setIssue(response.issue);
          if (response.error) {
            console.log(response.error);
            notFound();
          }
        } catch (err) {
          console.error(err);
          notFound();
        }
      }
    };

    fetchIssue();
  }, [id]);

  const createOrEditISsue = async (data: IssueFormInterface) => {
    setIsSubmitting(true);
    try {
      if (id) {
        await axios.patch(`${process.env.NEXTAUTH_URL}/api/issues/${id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues/view');
      router.refresh();
    } catch (error) {
      setError('An error has happened!');
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className='max-w-lg ml-8 space-y-4 mr-4'
      onSubmit={handleSubmit((data: IssueFormInterface) =>
        createOrEditISsue(data)
      )}
    >
      <ErrorCallout>{error}</ErrorCallout>
      <Text size={'5'}>Create new issue</Text>
      <ErrorCallout>{errors.title?.message}</ErrorCallout>
      {/* text field component */}
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height='16' width='16' />
        </TextField.Slot>
        <TextField.Input
          defaultValue={issue?.title}
          placeholder='Issue title'
          {...register('title')}
        />
      </TextField.Root>
      <ErrorCallout>{errors.description?.message}</ErrorCallout>
      {/* description field component */}
      <Controller
        name='description'
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE placeholder='Issue description' {...field} />
        )}
      />

      <Button disabled={isSubmitting}>
        {id ? 'Edit issue' : 'Create issue'}
        {isSubmitting && <Loading />}
      </Button>
    </form>
  );
};

export default IssueForm;
