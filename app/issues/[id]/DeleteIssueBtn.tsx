'use client';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import React, { useState } from 'react';
import { DEL_ISSUE } from '../_axios/REQUESTS';
import { useRouter } from 'next/navigation';
import { Loading } from '@/app/components';
import delay from 'delay';

const DeleteIssueBtn = ({ id }: { id: number }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIssue = async () => {
    setIsDeleting(true);
    try {
      await DEL_ISSUE(id);
      router.push('/issues/view');
      router.refresh();
      setIsDeleting(false);
    } catch (error) {
      alert(error);
      setIsDeleting(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button disabled={isDeleting} color='red'>
          Delete Issue {isDeleting && <Loading />}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Confirm Deletion of Issue</Dialog.Title>
        <Dialog.Description size='2' mb='4'>
          Are you sure you want to delete this issue? You won't be able to
          restore it afterwards.
        </Dialog.Description>

        <Flex direction='column' gap='3'></Flex>

        <Flex gap='3' mt='4' justify='end'>
          <Dialog.Close>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={deleteIssue} color='red'>
              Delete Issue
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteIssueBtn;
